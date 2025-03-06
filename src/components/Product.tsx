"use client";
import CodeTabs from "@/components/CodeTabs";
import React, { useState } from "react";
import {
  Link2,
  Clipboard,
  Check,
  MoreVertical,
  Twitter,
  Trash2,
} from "lucide-react";
import FileTree from "@/components/FileTree";
import CodeBlock from "@/components/ui/code-block";
import { ProductData } from "@/types";
import AddSnippetModal from "./modals/AddSnippetModal";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import { useAppSelector } from "@/lib/redux/hooks";
import { deleteDocument } from "@/actions/firebase/deleteDocument";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

const Product = ({ product }: { product: ProductData }) => {
  const {
    id,
    description,
    fileTree,
    usefulLinks,
    title,
    installations,
    files,
    currentLevel,
    optimizationSuggestions,
    ownerId,
  } = product;
  const { user } = useAppSelector((state) => state.userSlice);
  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShareToX = () => {
    const text = `🚀 Just dropped a sleek code snippet! Check it out here: ${window.location.href} 💻✨\n\nIt's clean, efficient, and ready to roll. Let me know what you think! 👀🔥 #Coding #DevLife #codepulse`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;

    // Center popup window
    const width = 550;
    const height = 420;
    const left = window.screen.width / 2 - width / 2;
    const right = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Open popup window with centered position
    window.open(
      shareUrl,
      "Share to X",
      `width=${width},height=${height},left=${left},right=${right},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no`
    );
  };

  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    try {
      if (!id) {
        throw new Error("Product ID is missing");
      }
      
      const result = await deleteDocument("products", id, "/dashboard");
      
      if ("success" in result) {
        // Show success notification if needed
        router.push("/dashboard");
      } else {
        // Handle error
        console.error("Failed to delete product:", result.message);
        // You could show an error notification here
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="py-6 relative">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 h-full ">
        {/* Replace with NextUI Dropdown */}
        <div className="flex items-center gap-2 absolute -top-0 right-2 border-b pb-2 dark:bg-black bg-white">
          <AddSnippetModal showAsMenuItem product={product} />

          <Dropdown>
            <DropdownTrigger className="border rounded-full">
              <Button
                isIconOnly
                variant="light"
                className="p-0 bg-transparent"
                radius="full"
              >
                <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Product actions">
              <DropdownItem
                key="copy"
                startContent={
                  isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )
                }
                onClick={handleCopy}
              >
                Copy Link
              </DropdownItem>

              <DropdownItem
                key="share-x"
                startContent={<Twitter className="h-4 w-4" />}
                onClick={handleShareToX}
              >
                Share to X
              </DropdownItem>

              {user && (ownerId === user.id || user.role === "ADMIN") ? (
                <>
                  <DropdownItem
                    key="delete-product"
                    startContent={
                      <Trash2 className="h-4 w-4 hover:text-danger" />
                    }
                    className="hover:text-danger"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete Product
                  </DropdownItem>
                </>
              ) : null}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof title === "string" ? title : ""}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {typeof description === "string" ? description : ""}
          </p>
        </div>

        {/* Installations */}
        {installations && installations.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Installation Steps
            </h2>
            <div className="">
              {" "}
              {installations.map((installation, index) => (
                <div
                  key={index}
                  className="space-y-4 border-l border-gray-700 pl-6 lg:pl-8 pb-4"
                >
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {installation.title}
                  </h3>
                  {installation.description && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {installation.description}
                    </p>
                  )}
                  <div className="rounded-[0.25rem] overflow-hidden">
                    {" "}
                    <CodeBlock
                      language="bash"
                      filename="Terminal"
                      code={installation.code}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Tree */}
        {fileTree && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Folder Structure
            </h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-[1.25rem]">
              <FileTree content={fileTree} />
            </div>
          </div>
        )}

        {/* Code Files */}
        {files && (
          <div className=" flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Code Files{" "}
            </h2>
            <div className="border rounded-[1.25rem] w-full border-slate-400 dark:border-slate-600 p-4 flex">
              <CodeTabs tabs={files as TabData[]} />
            </div>
          </div>
        )}

        {/* Current Level */}
        {currentLevel && currentLevel.length > 0 && (
          <div className="flex flex-col gap-6 px4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Current Capabilities
            </h2>
            <div className="relative">
              {currentLevel.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 last:pb-0 lg:ml-10 ml-4"
                >
                  <div className="absolute left-0 top-[6px] h-full w-[2px] bg-gradient-to-b from-blue-500 to-blue-300 dark:from-blue-400 dark:to-blue-600" />
                  <div className="absolute left-[-7px] top-[6px] h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/20" />
                  <div className="lg:ml-4  rounded-xl   transition-all duration-300 ">
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimization Suggestions */}
        {optimizationSuggestions && optimizationSuggestions.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Optimization Suggestions
            </h2>
            <div className="relative">
              {optimizationSuggestions.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 last:pb-0 lg:ml-10 ml-4"
                >
                  <div className="absolute left-0 top-[6px] h-full w-[2px] bg-gradient-to-b from-amber-500 to-amber-300 dark:from-amber-400 dark:to-amber-600" />
                  <div className="absolute left-[-7px] top-[6px] h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20" />
                  <div className="lg:ml-4  rounded-xl   transition-all duration-300 ">
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Useful Links */}
        {usefulLinks && usefulLinks.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Useful Resources
            </h2>
            <div className="relative">
              {usefulLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 last:pb-0 lg:ml-10 "
                >
                  <div className="absolute left-0 top-[6px] h-full w-[2px] bg-gradient-to-b from-indigo-500 to-indigo-300 dark:from-indigo-400 dark:to-indigo-600" />
                  <div className="absolute left-[-7px] top-[6px] h-4 w-4 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/20" />
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 flex items-center space-x-3 rounded-xl0 px-4 transition-all duration-300 "
                  >
                    <Link2 className="h-5 w-5 flex-shrink-0 text-indigo-500" />
                    <span className="text-gray-600 dark:text-gray-300 w-fit">
                      {link.title}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        itemName={title?.toString() || "this product"}
        isDeleting={isDeleting}
        onConfirm={handleDeleteProduct}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Product;
