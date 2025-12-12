export default function MyLearningError({ message }: { message?: string }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">
          Error Loading Your Courses
        </h1>
        <p className="text-muted-foreground">
          {message || "Failed to load your learning data"}
        </p>
      </div>
    </main>
  );
}
