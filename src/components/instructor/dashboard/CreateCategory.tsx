import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createCategory } from "@/services/category.services";
import { Loader2, Plus, TriangleAlert, Tag } from "lucide-react";
import { useState } from "react";

export default function CreateCategory({ refetch }: { refetch: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNewCategory = async (e: any) => {
    e.preventDefault();
    setError(null);

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
        setError(null);
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
          className="bg-background/60 border-border hover:border-primary/50 hover:bg-primary/10 transition-colors h-11 w-11 shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background border-border sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Create New Category
            </DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Add a new category to organize your courses better
          </p>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          {error && (
            <Alert
              variant="destructive"
              className="border-red-200 bg-red-50 dark:bg-red-950/20"
            >
              <TriangleAlert className="h-4 w-4" />
              <AlertDescription className="font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4" />
              Category Name
            </label>
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g., Web Development, Data Science"
              className="bg-background/60 border-border hover:border-primary/50 focus:border-primary transition-colors h-11"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateNewCategory(e);
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setNewCategoryName("");
                setError(null);
              }}
              className="h-10"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateNewCategory}
              disabled={!newCategoryName.trim() || isLoading}
              className="h-10 min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Tag className="mr-2 h-4 w-4" />
                  Create
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
