"use client";

import { Content } from "@prismicio/client";
import { createContext, useContext, useMemo, useState } from "react";

type CustomizerControlsContext = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (wheel: Content.BoardCustomizerDocumentDataDecksItem) => void;
  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTruck: (wheel: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolt: (wheel: Content.BoardCustomizerDocumentDataMetalsItem) => void;
};
const defaultContext: CustomizerControlsContext = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
};

const CustomizerControksContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  children?: React.ReactNode;
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
};

export function CustomizerControlsProvider({
  defaultWheel,
  defaultBolt,
  defaultDeck,
  defaultTruck,
  children,
}: CustomizerControlsProviderProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedBolt, setBolt] = useState(defaultBolt);
  const [selectedTruck, setTruck] = useState(defaultTruck);

  const value = useMemo<CustomizerControlsContext>(() => {
    return {
      selectedWheel,
      setWheel,
      selectedBolt,
      setBolt,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
    };
  }, [selectedWheel, selectedBolt, selectedDeck, selectedTruck]);
  
  return (
    <CustomizerControksContext.Provider value={value}>

      {children}
    </CustomizerControksContext.Provider>
  );
}

export function useCustomizerControls() {

  return useContext(CustomizerControksContext);
}
