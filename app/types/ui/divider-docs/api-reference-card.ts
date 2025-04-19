type APIParameter = {
  name: string;
  description: string;
};

export type APIReferenceCardProps = {
  title: string;
  description?: string;
  parameters: APIParameter[];
  options?: APIParameter[];
};
