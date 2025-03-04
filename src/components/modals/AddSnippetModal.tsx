"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import AddProductPage from "../forms/AddProductForm";
import { Plus } from "lucide-react";
import { ProductData } from "@/types";

interface AddSnippetModalProps {
  showAsMenuItem?: boolean;
  product?: ProductData;
}

export default function AddSnippetModal({
  showAsMenuItem,
  product,
}: AddSnippetModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        variant={showAsMenuItem ? "light" : "ghost"}
        className={` rounded-[0.25rem]  ${
          showAsMenuItem
            ? " w-full rounded-[0.5rem]   text-left flex items-center justify-start   py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-stone-700"
            : "w-fit border-black/30 dark:border-white/50"
        }`}
        onPress={onOpen}
      >
        <Plus size={18} className={showAsMenuItem ? "m" : ""} />
        <div className=""> {product ? "Edit Snippet" : "Add Snippet"}</div>
      </Button>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-h-[80vh] mt-[2rem]"
        scrollBehavior="inside"
      >
        <ModalContent className="mt-[2rem]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {product ? "Edit Snippet" : "Add New Snippet"}
              </ModalHeader>
              <ModalBody>
                <AddProductPage onClose={onClose} initialData={product} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
