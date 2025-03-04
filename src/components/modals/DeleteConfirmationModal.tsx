"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { AlertTriangle } from "lucide-react";

interface DeleteMenuItemConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  itemName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  onOpenChange,
  itemName,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteMenuItemConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-1">
              <AlertTriangle className="text-danger h-6 w-6" />
              <span>Confirm Deletion</span>
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete <strong>{itemName}</strong>?
                This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={() => {
                  onCancel();
                  onClose();
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button color="danger" onPress={onConfirm} isLoading={isDeleting}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
