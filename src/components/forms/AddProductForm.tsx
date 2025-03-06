"use client";
import { addDocument } from "@/actions/firebase/addDocument";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, PlusCircle, Trash, Info } from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Switch,
  Select,
  SelectItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tooltip,
  addToast,
} from "@heroui/react";
import { useAppSelector } from "@/lib/redux/hooks";
import { updateDocument } from "@/actions/firebase/updateDocument";
import { ProductData } from "@/types";

const CATEGORIES = [
  { value: "auth", label: "Authentication & Authorization" },
  { value: "database", label: "Database Integration" },
  { value: "payment", label: "Payment Systems" },
  { value: "state", label: "State Management" },
] as const;

interface AddProductPageProps {
  onClose: () => void;
  initialData?: ProductData;
}

export default function AddProductPage({
  onClose,
  initialData,
}: AddProductPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [privacy, setPrivacy] = useState<"PUBLIC" | "PRIVATE">(
    (initialData?.privacy as "PUBLIC" | "PRIVATE") || "PUBLIC"
  );
  const [installations, setInstallations] = useState(
    initialData?.installations || [{ title: "", description: "", code: "" }]
  );
  const [files, setFiles] = useState(
    initialData?.files || [{ title: "", code: "" }]
  );
  const [fileTree, setFileTree] = useState(initialData?.fileTree || "");
  const [currentLevel, setCurrentLevel] = useState(
    initialData?.currentLevel?.map((text) => ({ text })) || [{ text: "" }]
  );
  const [optimizationSuggestions, setOptimizationSuggestions] = useState(
    initialData?.optimizationSuggestions?.map((text) => ({ text })) || [
      { text: "" },
    ]
  );
  const [usefulLinks, setUsefulLinks] = useState(
    initialData?.usefulLinks || [{ title: "", href: "" }]
  );
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
        createdAt: initialData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        privacy,
        // If user is admin, allow setting ownerId to current user
        // If editing, keep existing owner unless user is admin
        ownerId: isAdmin 
          ? user?.id 
          : initialData?.ownerId || user?.id,
        ...(initialData?.id && { id: initialData.id }),
      };

      const path = initialData ? `/products/${initialData.id}` : "/";
      const result = await (initialData
        ? updateDocument("products", initialData.id, product, path)
        : addDocument("products", product, new Date().toISOString(), path));
      
      if ("id" in result) {
        addToast({
          title: initialData ? "Product updated" : "Product created",
          description: initialData ? "Your product has been updated successfully" : "Your product has been created successfully",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        });
        onClose();
        router.push(path);
      } else {
        addToast({
          title: "Error",
          description: "Failed to save product. Please try again.",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
        });
      }
    } catch (error) {
      console.error("Error saving product:", error);
      addToast({
        title: "Error",
        description: "An unexpected error occurred while saving the product",
        promise: new Promise((resolve) => setTimeout(resolve, 3000)),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-8 pb-[1rem]">
          {/* Form header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">
              {initialData ? "Edit Snippet" : "Add New Snippet"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in the details below to{" "}
              {initialData ? "update your" : "create a new"} code snippet
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Basic Info */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium">
                        {" "}
                        <span className="text-sm">
                          {privacy === "PUBLIC" ? "Public" : "Private"}
                        </span>
                      </label>
                      <Switch
                        defaultSelected
                        isSelected={privacy === "PUBLIC"}
                        onValueChange={(checked) =>
                          setPrivacy(checked ? "PUBLIC" : "PRIVATE")
                        }
                        value={privacy}
                        size="sm"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col gap-5">
                    <Input
                      label="Snippet Title"
                      type="text"
                      variant="bordered"
                      name="title"
                      placeholder="Enter a descriptive title"
                      labelPlacement="outside"
                      disabled={isLoading}
                      required
                      defaultValue={initialData?.title || ""}
                      startContent={
                        <Tooltip content="A clear title helps others find your snippet">
                          <Info className="h-4 w-4 text-gray-400" />
                        </Tooltip>
                      }
                    />

                    <Select
                      label="Category"
                      name="category"
                      variant="bordered"
                      placeholder="Select a category"
                      labelPlacement="outside"
                      disabled={isLoading}
                      required
                      defaultSelectedKeys={
                        initialData?.category
                          ? [initialData.category as string]
                          : []
                      }
                    >
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Textarea
                      label="Description"
                      name="description"
                      placeholder="Explain what your snippet does and how it helps"
                      variant="bordered"
                      labelPlacement="outside"
                      disabled={isLoading}
                      rows={4}
                      defaultValue={initialData?.description || ""}
                    />

                    <Input
                      label="Price (USD)"
                      type="number"
                      name="price"
                      variant="bordered"
                      placeholder="0.00"
                      labelPlacement="outside"
                      disabled={isLoading || !isAdmin}
                      value={!isAdmin ? "0" : undefined}
                      required
                      defaultValue={
                        initialData?.price
                          ? (initialData.price / 100).toString()
                          : "0"
                      }
                      startContent={<span>$</span>}
                      endContent={
                        !isAdmin && (
                          <Tooltip content="Only admins can set prices">
                            <Info className="h-4 w-4 text-gray-400" />
                          </Tooltip>
                        )
                      }
                    />
                  </div>
                </CardBody>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <h2 className="text-xl font-semibold">File Structure</h2>
                </CardHeader>
                <CardBody>
                  <Textarea
                    label="Describe the file structure of your project"
                    labelPlacement="outside"
                    variant="bordered"
                    value={fileTree}
                    onChange={(e) => setFileTree(e.target.value)}
                    placeholder="e.g.\n/src\n  /components\n    Header.tsx\n    Footer.tsx\n  /pages\n    index.tsx"
                    rows={6}
                    disabled={isLoading}
                  />
                </CardBody>
              </Card>
            </div>

            {/* Right Column - Installation & Files */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Installation Steps</h2>
                  <Button
                    type="button"
                    variant="ghost"
                    isIconOnly
                    onPress={handleAddInstallation}
                    className="text-blue-500"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardBody>
                  <div className="grid gap-5">
                    {installations.map((installation, index) => (
                      <Card
                        key={index}
                        className="border border-gray-200 dark:border-gray-700"
                      >
                        <CardBody className="space-y-4">
                          <Input
                            label={`Step ${index + 1} Title`}
                            variant="bordered"
                            labelPlacement="outside"
                            type="text"
                            placeholder="e.g., Install dependencies"
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

                          <Textarea
                            variant="bordered"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Explain what this step does"
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

                          <Textarea
                            label="Installation Command"
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="e.g., npm install @heroui/react"
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
                            classNames={{
                              innerWrapper: "font-mono",
                            }}
                          />

                          <div className="flex justify-end">
                            {installations.length > 1 && (
                              <Button
                                type="button"
                                color="danger"
                                variant="light"
                                isIconOnly
                                onPress={() => handleRemoveInstallation(index)}
                                disabled={isLoading}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Code Files</h2>
                  <Button
                    type="button"
                    variant="ghost"
                    isIconOnly
                    onPress={handleAddFile}
                    className="text-blue-500"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 gap-5">
                    {files.map((file, index) => (
                      <Card
                        key={index}
                        className="border border-gray-200 dark:border-gray-700"
                      >
                        <CardBody className="space-y-4">
                          <Input
                            label="File Path/Title"
                            variant="bordered"
                            labelPlacement="outside"
                            type="text"
                            placeholder="e.g., src/components/Button.tsx"
                            value={file.title}
                            onChange={(e) =>
                              handleFileChange(index, "title", e.target.value)
                            }
                            disabled={isLoading}
                            required
                          />
                          <Textarea
                            variant="bordered"
                            label="Code"
                            labelPlacement="outside"
                            placeholder="Enter your code here"
                            value={file.code}
                            onChange={(e) =>
                              handleFileChange(index, "code", e.target.value)
                            }
                            disabled={isLoading}
                            rows={6}
                            required
                            classNames={{
                              innerWrapper: "font-mono",
                            }}
                          />
                          <div className="flex justify-end">
                            {files.length > 1 && (
                              <Button
                                type="button"
                                color="danger"
                                variant="light"
                                isIconOnly
                                onPress={() => handleRemoveFile(index)}
                                disabled={isLoading}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Additional Information Sections */}
            <div className="col-span-12">
              <Card className="shadow-sm">
                <CardHeader>
                  <h2 className="text-xl font-semibold">
                    Additional Information
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Useful Links */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-md font-medium">Useful Links</h3>
                        <Button
                          type="button"
                          variant="light"
                          isIconOnly
                          size="sm"
                          onPress={() =>
                            handleAddItem(setUsefulLinks, {
                              title: "",
                              href: "",
                            })
                          }
                          className="text-blue-500"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <Divider />
                      {usefulLinks.map((item, index) => (
                        <div key={index} className="space-y-3">
                          <Input
                            variant="bordered"
                            size="sm"
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
                            label="Title"
                            labelPlacement="outside"
                          />
                          <div className="flex gap-2 items-center">
                            <Input
                              variant="bordered"
                              size="sm"
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
                              placeholder="https://example.com"
                              label="URL"
                              labelPlacement="outside"
                              className="flex-1"
                            />
                            {usefulLinks.length > 1 && (
                              <Button
                                type="button"
                                color="danger"
                                variant="light"
                                isIconOnly
                                size="sm"
                                onPress={() =>
                                  handleRemoveItem(setUsefulLinks, index)
                                }
                                className="mt-6"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          {index < usefulLinks.length - 1 && (
                            <Divider className="my-2" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Current Level */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-md font-medium">
                          Current Capabilities
                        </h3>
                        <Button
                          type="button"
                          variant="light"
                          isIconOnly
                          size="sm"
                          onPress={() =>
                            handleAddItem(setCurrentLevel, { text: "" })
                          }
                          className="text-blue-500"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <Divider />
                      {currentLevel.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            variant="bordered"
                            size="sm"
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
                            placeholder="e.g., Supports dark mode"
                            label={`Capability ${index + 1}`}
                            labelPlacement="outside"
                            className="flex-1"
                          />
                          {currentLevel.length > 1 && (
                            <Button
                              type="button"
                              color="danger"
                              variant="light"
                              isIconOnly
                              size="sm"
                              onPress={() =>
                                handleRemoveItem(setCurrentLevel, index)
                              }
                              className="mt-6"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Optimization Suggestions */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-md font-medium">
                          Optimization Suggestions
                        </h3>
                        <Button
                          type="button"
                          variant="light"
                          isIconOnly
                          size="sm"
                          onPress={() =>
                            handleAddItem(setOptimizationSuggestions, {
                              text: "",
                            })
                          }
                          className="text-blue-500"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <Divider />
                      {optimizationSuggestions.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            variant="bordered"
                            size="sm"
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
                            placeholder="e.g., Use memoization to improve performance"
                            label={`Suggestion ${index + 1}`}
                            labelPlacement="outside"
                            className="flex-1"
                          />
                          {optimizationSuggestions.length > 1 && (
                            <Button
                              type="button"
                              color="danger"
                              variant="light"
                              isIconOnly
                              size="sm"
                              onPress={() =>
                                handleRemoveItem(
                                  setOptimizationSuggestions,
                                  index
                                )
                              }
                              className="mt-6"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              color="primary"
              disabled={isLoading}
              className="px-8 py-2"
              startContent={isLoading ? null : <Send className="h-5 w-5" />}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : initialData ? (
                "Update Snippet"
              ) : (
                "Add Snippet"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
