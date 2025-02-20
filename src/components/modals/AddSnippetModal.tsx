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

export default function AddSnippetModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        className="w-fit rounded-[0.25rem] border-black/30 dark:border-white/50"
        onPress={onOpen}
      >
        <Plus size={18}/> Add Snippet
      </Button>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-h-[80vh] mt-[2rem]"
        scrollBehavior="inside"
      >
        <ModalContent className=" mt-[2rem]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                Snippet Form{" "}
              </ModalHeader>
              <ModalBody>
                <AddProductPage onClose={onClose} />
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
