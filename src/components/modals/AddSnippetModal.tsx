"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import AddProductPage from "../forms/AddProductForm";
import { Pen, Plus } from "lucide-react";
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
        isIconOnly={product ? true : false}
        size="sm"
        variant={showAsMenuItem || product ? "light" : "bordered"}
        className={` rounded-[0.25rem]  ${
          showAsMenuItem
            ? " w-full rounded-[0.5rem]   text-left flex items-center justify-start   py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-stone-700"
            : "w-fit hover:border border-black/10 dark:border-white/10"
        }`}
        onPress={onOpen}
      >
        {product ? (
          <Pen size={14} className={showAsMenuItem ? "m" : ""} />
        ) : (
          <Plus size={18} className={showAsMenuItem ? "m" : ""} />
        )}

        {product ? (
          <div className="md:flex hidden "> </div>
        ) : (
          <div className="md:flex hidden "> Add Snippet</div>
        )}
      </Button>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-h-[70vh] mt-[10rem] "
        scrollBehavior="inside"
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalBody className="">
                <AddProductPage onClose={onClose} initialData={product} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
