export type VersionedPrompts = Record<
  `v${number}`,
  string | ((content: string) => string)
>;
