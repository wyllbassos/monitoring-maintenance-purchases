import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactElement,
} from 'react';

import ComprasList from '../pages/ComprasList';
import Custos from '../pages/Custos';
import PcsBloqueados from '../pages/PcsBloqueados';
import RelatorioPCO from '../pages/RelatorioPCO';
import TratativaSSs from '../pages/TratativaSSs';

export type Route =
  | 'Lista Compras'
  | "PC's Bloqueados"
  | 'PCO'
  | 'Custos'
  | 'Tratativas';

type PageBaseItens = {
  route: Route;
  selected: boolean;
  componet: ReactElement;
};

const pageBaseItens: PageBaseItens[] = [
  { route: 'Lista Compras', selected: true, componet: <ComprasList /> },
  { route: "PC's Bloqueados", selected: false, componet: <PcsBloqueados /> },
  { route: 'PCO', selected: false, componet: <RelatorioPCO /> },
  { route: 'Custos', selected: false, componet: <Custos /> },
  { route: 'Tratativas', selected: false, componet: <TratativaSSs /> },
];

type SideBarButton = { text: string; onClick: () => void };

export interface IPageBaseStateData {
  isSideBarShow: boolean;
  sidebarComponent?: JSX.Element;
  pageBaseItens: PageBaseItens[];
  sidebarButtons?: SideBarButton[];
}

export interface IPageBaseContextData extends IPageBaseStateData {
  handleShowSideBar: (isSideBarShow: boolean) => void;
  setSidebarComponent: (sidebarComponent: JSX.Element) => void;
  setSidebarButtons: (sideBarButton: SideBarButton[]) => void;
  handleChangePageBaseItens: (route: Route) => void;
}

const PageBaseContext = createContext<IPageBaseContextData>(
  {} as IPageBaseContextData,
);

type PageBaseProviderProps = {
  children: React.ReactNode;
};

export const PageBaseProvider: React.FC<PageBaseProviderProps> = ({
  children,
}: PageBaseProviderProps) => {
  const [state, setState] = useState<IPageBaseStateData>({
    isSideBarShow: false,
    pageBaseItens,
  });

  const handleShowSideBar = useCallback(
    (isSideBarShow: boolean) => {
      setState(current => ({
        ...current,
        isSideBarShow,
      }));
    },
    [setState],
  );

  const setSidebarComponent = useCallback(
    (sidebarComponent: JSX.Element) => {
      setState(current => ({
        ...current,
        sidebarComponent,
        sidebarButtons: undefined,
      }));
    },
    [setState],
  );

  const setSidebarButtons = useCallback(
    (sidebarButtons: SideBarButton[]) => {
      setState(current => ({
        ...current,
        sidebarComponent: undefined,
        sidebarButtons,
      }));
    },
    [setState],
  );

  const handleChangePageBaseItens = useCallback((route: Route) => {
    const newPageBaseItens = [
      ...pageBaseItens.map(headerItenMenu => {
        const selected = headerItenMenu.route === route;
        return { ...headerItenMenu, selected };
      }),
    ];

    setState(current => ({
      ...current,
      sidebarComponent: undefined,
      sidebarButtons: undefined,
      pageBaseItens: [...newPageBaseItens],
    }));
  }, []);

  return (
    <PageBaseContext.Provider
      value={{
        ...state,
        handleShowSideBar,
        setSidebarComponent,
        setSidebarButtons,
        handleChangePageBaseItens,
      }}
    >
      {children}
    </PageBaseContext.Provider>
  );
};

export const usePageBase = (): IPageBaseContextData => {
  const context = useContext(PageBaseContext);

  if (!context) {
    throw new Error('usePageBase must be used withn a PageBaseProvider');
  }

  return context;
};
