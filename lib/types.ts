export type FileStructure = {
  files: string[];
  [directory: string]: FileStructure | string[];
};
