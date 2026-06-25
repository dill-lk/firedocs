declare global {
  interface Window {
    mermaid: {
      initialize: (config: any) => void;
      render: (id: string, code: string) => Promise<{ svg: string }>;
    };
  }
}

export {};
