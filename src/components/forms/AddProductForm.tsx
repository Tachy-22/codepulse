"use client";

import { addDocument } from "@/actions/firebase/addDocument";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, PlusCircle, Trash } from "lucide-react";

const CATEGORIES = [
  { value: "auth", label: "Authentication & Authorization" },
  { value: "database", label: "Database Integration" },
  { value: "payment", label: "Payment Systems" },
  { value: "state", label: "State Management" },
] as const;

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
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
        price: parseInt(formData.get("price") as string) * 100,
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
        router.push("/products");
      }
    } finally {
      setIsLoading(false);
    }
  };
  //
  return (
    <div className="min-h-screen p-4 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 ">
          Add New Snippet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Basic Info */}
            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Product Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="block w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-black focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      className="block w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-black focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading}
                      required
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Enter product description"
                      className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                      bg-white dark:bg-black text-gray-900 dark:text-gray-100
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition-all duration-200"
                      disabled={isLoading}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                      bg-white dark:bg-black text-gray-900 dark:text-gray-100
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition-all duration-200"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* File Tree moved to left column */}
              <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  File Structure
                </h2>
                <textarea
                  value={fileTree}
                  onChange={(e) => setFileTree(e.target.value)}
                  className="w-full h-[200px] font-mono text-sm p-3 rounded-lg border border-gray-200 
                  dark:border-gray-700 bg-white dark:bg-black"
                  placeholder="Enter file structure"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Right Column - Installation & Files */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              {/* Installations Section */}
              <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Installation Steps
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddInstallation}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400
                    transition-colors duration-200"
                  >
                    <PlusCircle className="h-5 w-5" />
                    <span>Add Step</span>
                  </button>
                </div>
                <div className="grid gap-4">
                  {installations.map((installation, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-3 bg-white dark:bg-black transition-all duration-200"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Installation Title
                        </label>
                        <input
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
                          className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-black text-gray-900 dark:text-gray-100
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Description
                        </label>
                        <textarea
                          placeholder="Enter installation description"
                          value={installation.description}
                          onChange={(e) =>
                            handleInstallationChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-black text-gray-900 dark:text-gray-100
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                          disabled={isLoading}
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Installation Command
                        </label>
                        <textarea
                          placeholder="Enter installation command"
                          value={installation.code}
                          onChange={(e) =>
                            handleInstallationChange(
                              index,
                              "code",
                              e.target.value
                            )
                          }
                          className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-mono text-sm
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                          disabled={isLoading}
                          rows={2}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        {installations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveInstallation(index)}
                            className="text-red-500 text-sm flex items-center space-x-1"
                            disabled={isLoading}
                          >
                            <Trash className="h-4 w-4" />
                            <span>Remove Installation</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Files Section */}
              <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Add Files (Title & Code)
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddFile}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400
                    transition-colors duration-200"
                  >
                    <PlusCircle className="h-5 w-5" />
                    <span>Add File</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-300 dark:border-gray-600 rounded-md space-y-3 bg-white dark:bg-black transition-all duration-200"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          File Title
                        </label>
                        <input
                          type="text"
                          placeholder="Enter file title"
                          value={file.title}
                          onChange={(e) =>
                            handleFileChange(index, "title", e.target.value)
                          }
                          className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-black text-gray-900 dark:text-gray-100
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Code Snippet
                        </label>
                        <textarea
                          placeholder="Enter code snippet"
                          value={file.code}
                          onChange={(e) =>
                            handleFileChange(index, "code", e.target.value)
                          }
                          className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-mono text-sm
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                          disabled={isLoading}
                          rows={4}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        {files.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 text-sm flex items-center space-x-1"
                            disabled={isLoading}
                          >
                            <Trash className="h-4 w-4" />
                            <span>Remove File</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="bg-white col-span-12 dark:bg-black rounded-xl shadow-sm p-6 md:-8 w-full">
              <div className="space-y-4 p-6 bg-white dark:bg-black/50 rounded-lg transition-all duration-200 w-full">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Useful Links
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddItem(setUsefulLinks, { title: "", href: "" })
                    }
                    className="text-blue-500 text-sm flex items-center space-x-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Add Link</span>
                  </button>
                </div>
                {usefulLinks.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2">
                      <input
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
                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-black text-gray-900 dark:text-gray-100
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                        placeholder="Link Title"
                      />
                      <input
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
                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-black text-gray-900 dark:text-gray-100
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          transition-all duration-200"
                        placeholder="URL"
                      />
                      {usefulLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveItem(setUsefulLinks, index)
                          }
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section - Additional Info */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Level */}
              <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6">
                <div className="space-y-4 p-6 bg-white dark:bg-black/50 rounded-lg transition-all duration-200">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Current Level of Code
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddItem(setCurrentLevel, { text: "" })
                      }
                      className="text-blue-500 text-sm flex items-center space-x-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Add Item</span>
                    </button>
                  </div>
                  {currentLevel.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
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
                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                        bg-white dark:bg-black text-gray-900 dark:text-gray-100
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200"
                        placeholder="Enter capability"
                      />
                      {currentLevel.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveItem(setCurrentLevel, index)
                          }
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization Suggestions */}
              <div className="bg-white dark:bg-black rounded-xl shadow-sm p-6 md:-4">
                <div className="space-y-4 p-6 bg-white dark:bg-black/50 rounded-lg transition-all duration-200">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Optimization Suggestions
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddItem(setOptimizationSuggestions, { text: "" })
                      }
                      className="text-blue-500 text-sm flex items-center space-x-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Add Suggestion</span>
                    </button>
                  </div>
                  {optimizationSuggestions.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
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
                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                        bg-white dark:bg-black text-gray-900 dark:text-gray-100
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200"
                        placeholder="Enter suggestion"
                      />
                      {optimizationSuggestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveItem(setOptimizationSuggestions, index)
                          }
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
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
          </button>
        </form>
      </div>
    </div>
  );
}
