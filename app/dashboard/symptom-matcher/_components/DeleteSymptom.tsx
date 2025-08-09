"use client";

import { deleteSymptomEntry } from "@/actions/analyzeSymptom.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteSymptom = ({ sympomId }: { sympomId: string }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const data = await deleteSymptomEntry(sympomId);
      if (data.success) {
        toast.success("Gejala berhasil dihapus.");
      }
    } catch (error) {
      toast.error("Gagal menghapus gejala.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Trash2Icon className="text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan menghapus daftar gejala ini secara permanen dan tidak
            bisa dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="cursor-pointer bg-red-500 hover:bg-red-500/80 text-white"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSymptom;
