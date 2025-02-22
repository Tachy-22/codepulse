"use client";

import { addDocument } from "@/actions/firebase/addDocument";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, PlusCircle, Trash } from "lucide-react";
import { Button, Input, Textarea, Switch } from "@heroui/react";
import { useAppSelector } from "@/lib/redux/hooks";

const CATEGORIES = [
  { value: "auth", label: "Authentication & Authorization" },
  { value: "database", label: "Database Integration" },
  { value: "payment", label: "Payment Systems" },
  { value: "state", label: "State Management" },
] as const;

export default function AddProductPage({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [privacy, setPrivacy] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const [installations, setInstallations] = useState([
    { title: "", description: "", code: "" },
  ]);
  const [files, setFiles] = useState([{ title: "", code: "" }]);
  const [fileTree, setFileTree] = useState("");
  const [currentLevel, setCurrentLevel] = useState([{ text: "" }]);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState([
    { text: "" },
  ]);
  const [usefulLinks, setUsefulLinks] = useState([{ title: "", href: "" }]);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.userSlice);
  const isAdmin = user && user.role === "ADMIN";
  const handleAddFile = () => {
    setFiles((prevFiles) => [...prevFiles, { title: "", code: "" }]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileChange = (index: number, key: string, value: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, [key]: value } : file
      )
    );
  };

  const handleAddItem = <
    T extends { text: string } | { title: string; href: string }
  >(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    template: T
  ) => {
    setter((prev) => [...prev, template]);
  };

  const handleRemoveItem = <
    T extends { text: string } | { title: string; href: string }
  >(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index) as T[]);
  };

  const handleItemChange = <T extends Record<string, string>>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    index: number,
    key: string,
    value: string
  ) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const handleAddInstallation = () => {
    setInstallations((prev) => [
      ...prev,
      { title: "", description: "", code: "" },
    ]);
  };

  const handleRemoveInstallation = (index: number) => {
    setInstallations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInstallationChange = (
    index: number,
    key: string,
    value: string
  ) => {
    setInstallations((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ product: "adding" });

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const product = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: isAdmin ? parseInt(formData.get("price") as string) * 100 : 0,
        installations: installations.filter(
          (install) => install.title && install.code
        ),
        files,
        fileTree,
        currentLevel: currentLevel.map((item) => item.text).filter(Boolean),
        optimizationSuggestions: optimizationSuggestions
          .map((item) => item.text)
          .filter(Boolean),
        usefulLinks: usefulLinks.filter((link) => link.title && link.href),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        privacy,
        ownerId: user && user.id,
      };
      console.log({ product });
      const result = await addDocument(
        "products",
        product,
        new Date().toISOString(),
        "/"
      );
      console.log({ result });
      if ("id" in result) {
        onClose();
        router.push("/products");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8 pb-[1rem]">
          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Basic Info */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className=" rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center">
                  {" "}
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    Basic Information
                  </h2>
                  <div className="flex flex-col items-start justify-between">
                    <div className="flex items-center gap-3">
                      {" "}
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-100">
                        Privacy
                      </label>
                      <Switch
                        checked={privacy === "PRIVATE"}
                        onValueChange={(checked) =>
                          setPrivacy(checked ? "PUBLIC" : "PRIVATE")
                        }
                        value={privacy}
                        className="border rounded-full"
                      />
                    </div>

                    <span className="text-sm text-gray-500">
                      {privacy === "PUBLIC" ? "Public" : "Private"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <Input
                      label=" Snippet Title"
                      type="text"
                      variant="bordered"
                      name="title"
                      placeholder="Enter snippet title"
                      labelPlacement="outside"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <div className="relative w-full">
                      <select
                        name="category"
                        disabled={isLoading}
                        required
                        className="w-full px-4 py-2.5 text-sm rounded-lg bg-white dark:bg-gray-900
      border border-gray-300 dark:border-gray-700
      text-gray-900 dark:text-gray-100
      focus:border-blue-500 dark:focus:border-blue-400
      focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-all duration-200 ease-in-out
      hover:border-gray-400 dark:hover:border-gray-600
      appearance-none cursor-pointer"
                      >
                        <option
                          value=""
                          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2"
                        >
                          Select a category
                        </option>
                        {CATEGORIES.map((category) => (
                          <option
                            key={category.value}
                            value={category.value}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Textarea
                      labelPlacement="outside"
                      label=" Description"
                      name="description"
                      placeholder="Enter snippet description"
                      variant="bordered"
                      disabled={isLoading}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Input
                      labelPlacement="outside"
                      label="     Price (USD)"
                      type="number"
                      name="price"
                      variant="bordered"
                      placeholder="0.00"
                      disabled={isLoading || !isAdmin}
                      value={!isAdmin ? "0" : undefined}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* File Tree moved to left column */}
              <div className=" rounded-xl shadow-sm p-6">
                <Textarea
                  label=" File Structure
"
                  labelPlacement="outside"
                  variant="bordered"
                  value={fileTree}
                  onChange={(e) => setFileTree(e.target.value)}
                  placeholder="Enter file structure"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Right Column - Installation & Files */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              {/* Installations Section */}
              <div className=" rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Installation Steps
                  </h2>
                  <Button
                    type="button"
                    isIconOnly
                    onPress={handleAddInstallation}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400
                    transition-colors duration-200"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  {installations.map((installation, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-3  transition-all duration-200"
                    >
                      <div>
                        <Input
                          label="                          Installation Title
"
                          variant="bordered"
                          labelPlacement="outside"
                          type="text"
                          placeholder="Enter installation title"
                          value={installation.title}
                          onChange={(e) =>
                            handleInstallationChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <div>
                        <Textarea
                          variant="bordered"
                          label="Description"
                          labelPlacement="outside"
                          placeholder="Enter installation description"
                          value={installation.description}
                          onChange={(e) =>
                            handleInstallationChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          disabled={isLoading}
                          rows={2}
                        />
                      </div>
                      <div>
                        <Textarea
                          label="                          Installation Command
"
                          variant="bordered"
                          labelPlacement="outside"
                          placeholder="Enter installation command"
                          value={installation.code}
                          onChange={(e) =>
                            handleInstallationChange(
                              index,
                              "code",
                              e.target.value
                            )
                          }
                          disabled={isLoading}
                          rows={2}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        {installations.length > 1 && (
                          <Button
                            type="button"
                            isIconOnly
                            onPress={() => handleRemoveInstallation(index)}
                            className="text-red-500 text-sm flex items-center space-x-1"
                            disabled={isLoading}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Files Section */}
              <div className=" rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Add Files (Title & Code)
                  </h2>
                  <Button
                    type="button"
                    isIconOnly
                    onPress={handleAddFile}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400
                    transition-colors duration-200"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-3  transition-all duration-200"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          File Title
                        </label>
                        <Input
                          variant="bordered"
                          type="text"
                          placeholder="Enter file title"
                          value={file.title}
                          onChange={(e) =>
                            handleFileChange(index, "title", e.target.value)
                          }
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <div>
                        <Textarea
                          variant="bordered"
                          label="Code Snippet"
                          placeholder="Enter code snippet"
                          value={file.code}
                          onChange={(e) =>
                            handleFileChange(index, "code", e.target.value)
                          }
                          disabled={isLoading}
                          rows={4}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        {files.length > 1 && (
                          <Button
                            type="button"
                            isIconOnly
                            onPress={() => handleRemoveFile(index)}
                            className="text-red-500 text-sm flex items-center space-x-1"
                            disabled={isLoading}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className=" col-span-12 rounded-xl shadow-sm p-6 md:-8 w-full">
              <div className="space-y-4 p-6 /50 rounded-lg transition-all duration-200 w-full">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Useful Links
                  </h3>
                  <Button
                    type="button"
                    isIconOnly
                    onPress={() =>
                      handleAddItem(setUsefulLinks, { title: "", href: "" })
                    }
                    className="text-blue-500 text-sm flex items-center space-x-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                {usefulLinks.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        variant="bordered"
                        labelPlacement="outside"
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleItemChange(
                            setUsefulLinks,
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Link Title"
                      />
                      <Input
                        variant="bordered"
                        type="url"
                        value={item.href}
                        onChange={(e) =>
                          handleItemChange(
                            setUsefulLinks,
                            index,
                            "href",
                            e.target.value
                          )
                        }
                        placeholder="URL"
                      />
                      {usefulLinks.length > 1 && (
                        <Button
                          type="button"
                          isIconOnly
                          onPress={() =>
                            handleRemoveItem(setUsefulLinks, index)
                          }
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section - Additional Info */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Level */}
              <div className=" rounded-xl shadow-sm p-6">
                <div className="space-y-4 p-6 /50 rounded-lg transition-all duration-200">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Level of Code
                    </h3>
                    <Button
                      type="button"
                      isIconOnly
                      onPress={() =>
                        handleAddItem(setCurrentLevel, { text: "" })
                      }
                      className="text-blue-500 text-sm flex items-center space-x-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  {currentLevel.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        variant="bordered"
                        type="text"
                        value={item.text}
                        onChange={(e) =>
                          handleItemChange(
                            setCurrentLevel,
                            index,
                            "text",
                            e.target.value
                          )
                        }
                        placeholder="Enter capability"
                      />
                      {currentLevel.length > 1 && (
                        <Button
                          type="button"
                          isIconOnly
                          onPress={() =>
                            handleRemoveItem(setCurrentLevel, index)
                          }
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization Suggestions */}
              <div className=" rounded-xl shadow-sm p-6 md:-4">
                <div className="space-y-4 p-6 /50 rounded-lg transition-all duration-200">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Optimization Suggestions
                    </h3>
                    <Button
                      type="button"
                      isIconOnly
                      onPress={() =>
                        handleAddItem(setOptimizationSuggestions, { text: "" })
                      }
                      className="text-blue-500 text-sm flex items-center space-x-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  {optimizationSuggestions.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        variant="bordered"
                        type="text"
                        value={item.text}
                        onChange={(e) =>
                          handleItemChange(
                            setOptimizationSuggestions,
                            index,
                            "text",
                            e.target.value
                          )
                        }
                        placeholder="Enter suggestion"
                      />
                      {optimizationSuggestions.length > 1 && (
                        <Button
                          type="button"
                          isIconOnly
                          onPress={() =>
                            handleRemoveItem(setOptimizationSuggestions, index)
                          }
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-md mx-auto flex items-center justify-center space-x-2 
            bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
            text-white p-4 rounded-xl transition-all duration-200 
            disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed
            shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span className="font-medium">Add Snippet</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
