"use client";

import { addDocument } from "@/actions/firebase/addDocument";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, PlusCircle, Trash } from "lucide-react";
//any

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

  const handleRemoveItem = <T extends { text: string } | { title: string; href: string }>(
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

      const result = await addDocument("products", product, "/");
      if ("id" in result) {
        router.push("/products");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-lg mx-auto rounded-lg shadow-sm p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter product title"
                className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter product description"
                className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (USD)
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Installations Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Installation Steps
            </h2>
            {installations.map((installation, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-md space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Installation Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter installation title"
                    value={installation.title}
                    onChange={(e) =>
                      handleInstallationChange(index, "title", e.target.value)
                    }
                    className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
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
                    className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    disabled={isLoading}
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Installation Command
                  </label>
                  <textarea
                    placeholder="Enter installation command"
                    value={installation.code}
                    onChange={(e) =>
                      handleInstallationChange(index, "code", e.target.value)
                    }
                    className="block w-full p-2.5 border border-gray-300 rounded-md font-mono text-sm focus:ring-green-500 focus:border-green-500"
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

            <button
              type="button"
              onClick={handleAddInstallation}
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition-colors"
              disabled={isLoading}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add Another Installation</span>
            </button>
          </div>

          {/* Files Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Add Files (Title & Code)
            </h2>
            {files.map((file, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-md space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    File Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter file title"
                    value={file.title}
                    onChange={(e) =>
                      handleFileChange(index, "title", e.target.value)
                    }
                    className="block w-full p-2.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Code Snippet
                  </label>
                  <textarea
                    placeholder="Enter code snippet"
                    value={file.code}
                    onChange={(e) =>
                      handleFileChange(index, "code", e.target.value)
                    }
                    className="block w-full p-2.5 border border-gray-300 rounded-md font-mono text-sm focus:ring-green-500 focus:border-green-500"
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

            <button
              type="button"
              onClick={handleAddFile}
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition-colors"
              disabled={isLoading}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add Another File</span>
            </button>
          </div>

          {/* Metadata Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Additional Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                File Tree
              </label>
              <textarea
                value={fileTree}
                onChange={(e) => setFileTree(e.target.value)}
                className="block w-full p-2.5 border border-gray-300 rounded-md font-mono text-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter file structure"
                rows={4}
                disabled={isLoading}
              />
            </div>

            {/* Current Level Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">
                  Current Level of Code
                </h3>
                <button
                  type="button"
                  onClick={() => handleAddItem(setCurrentLevel, { text: "" })}
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
                    className="flex-1 p-2.5 border border-gray-300 rounded-md"
                    placeholder="Enter capability"
                  />
                  {currentLevel.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setCurrentLevel, index)}
                      className="text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Optimization Suggestions */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">
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
                    className="flex-1 p-2.5 border border-gray-300 rounded-md"
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

            {/* Useful Links */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">
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
                      className="flex-1 p-2.5 border border-gray-300 rounded-md"
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
                      className="flex-1 p-2.5 border border-gray-300 rounded-md"
                      placeholder="URL"
                    />
                    {usefulLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(setUsefulLinks, index)}
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-md transition-colors disabled:bg-green-300"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Add Product</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
