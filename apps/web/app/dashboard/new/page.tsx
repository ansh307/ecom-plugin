import NewStoreForm from "./NewStoreForm";

export default function NewStorePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Create New Store</h1>

      <NewStoreForm />
    </main>
  );
}
