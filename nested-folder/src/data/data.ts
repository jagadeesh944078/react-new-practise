interface FileSystemNode {
  id: string;
  name: string;
  isFolder: boolean;
  children?: FileSystemNode[];
}

export const initialData: FileSystemNode = {
  id: "root",
  name: "root",
  isFolder: true,
  children: [
    {
      id: "folder1",
      name: "Folder1",
      isFolder: true,
      children: [
        {
          id: "file1",
          name: "File1",
          isFolder: true,
        },
      ],
    },
    {
      id: "file2",
      name: "File2",
      isFolder: true,
    },
  ],
};

export type { FileSystemNode };
