import { useState, createContext } from "react";

const ConnectedAddressContext = createContext([] as any);

type ProviderProps = {
  children: React.ReactNode;
  initialState: string;
};

export const ConnectedAddressProvider = ({
  children,
  initialState,
}: ProviderProps) => {
  const [connectedAddress, setConnectedAddress] = useState(initialState);

  return (
    <ConnectedAddressContext.Provider
      value={[connectedAddress, setConnectedAddress]}
    >
      {children}
    </ConnectedAddressContext.Provider>
  );
};

export default ConnectedAddressContext;
