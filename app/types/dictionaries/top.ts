export type TopDictionary = {
  top: {
    title: string;
    description: string;
    installation: {
      title: string;
    };
    usage: {
      title: string;
      examples: string;
    };
    features: {
      title: string;
      stringDivision: {
        title: string;
        description: string;
      };
      arrayProcessing: {
        title: string;
        description: string;
      };
      nestedArray: {
        title: string;
        description: string;
      };
      flexibleOutput: {
        title: string;
        description: string;
      };
      flatteningOption: {
        title: string;
        description: string;
      };
      mixedDelimiters: {
        title: string;
        description: string;
      };
    };
    api: {
      title: string;
      description: {
        divider: string;
        dividerFirst: string;
        dividerLast: string;
        dividerLoop: string;
        dividerNumberString: string;
      };
      function: {
        parameters: {
          title: string;
          input: string;
          dividers: string;
          options: string;
          size: string;
        };
        options: {
          title: string;
          flatten: string;
          trim: string;
          exclude: string;
          startOffset: string;
          maxChunks: string;
        };
      };
    };
    button: {
      playground: string;
    };
    presets: {
      title: string;
      description: string;
      email: {
        title: string;
        description: string;
      };
      csv: {
        title: string;
        description: string;
      };
      path: {
        title: string;
        description: string;
      };
    };
  };
};
