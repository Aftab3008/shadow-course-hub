import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/services/category.services";
import { Loader2, Plus, TriangleAlert } from "lucide-react";
import { useState } from "react";

export default function CreateCategory({ refetch }: { refetch: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNewCategory = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const name = newCategoryName.trim();
      if (!name) return;

      if (name.length < 3) {
        setError("Category name must be at least 3 characters long");
        return;
      }

      const category = await createCategory({ name });
      if (category.success) {
        setNewCategoryName("");
        setIsDialogOpen(false);
        refetch();
      } else {
        setError(category.message || "Failed to create category");
        setNewCategoryName("");
      }
    } catch (error) {
      setError(error.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="bg-background border-border"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Create New Category
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm flex items-center gap-3 justify-center bg-red-300  bg-opacity-10 p-4 rounded-lg">
              <TriangleAlert className="inline mr-1" />
              {error}
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground">
              Category Name
            </label>
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="bg-background border-border mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setNewCategoryName("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateNewCategory}
              disabled={!newCategoryName.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Category"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
