import { useEffect, useState } from "react";
import IconComponent from "../../components/genericIconComponent";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import useFlowsManagerStore from "../../stores/flowsManagerStore";
import { FlowSettingsPropsType } from "../../types/components";
import { FlowType } from "../../types/flow";
import BaseModal from "../baseModal";
import TableComponent from "../../components/tableComponent";
import { getMessagesTable, getTransactionTable } from "../../controllers/API";
import {
  ColDef,
  ColGroupDef,
  SizeColumnsToFitGridStrategy,
} from "ag-grid-community";

export default function FlowLogsModal({
  open,
  setOpen,
}: FlowSettingsPropsType): JSX.Element {
  const saveFlow = useFlowsManagerStore((state) => state.saveFlow);
  const currentFlow = useFlowsManagerStore((state) => state.currentFlow);
  const currentFlowId = useFlowsManagerStore((state) => state.currentFlowId);
  const flows = useFlowsManagerStore((state) => state.flows);
  useEffect(() => {
    setName(currentFlow!.name);
    setDescription(currentFlow!.description);
  }, [currentFlow!.name, currentFlow!.description, open]);

  const [name, setName] = useState(currentFlow!.name);
  const [description, setDescription] = useState(currentFlow!.description);
  const [columns, setColumns] = useState<Array<ColDef | ColGroupDef>>([]);
  const [rows, setRows] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("Transactions");

  function handleClick(): void {
    currentFlow!.name = name;
    currentFlow!.description = description;
    saveFlow(currentFlow!);
    setOpen(false);
  }

  useEffect(() => {
    if (activeTab === "Transactions") {
      getTransactionTable(currentFlowId, "union").then((data) => {
        const { columns, rows } = data;
        setColumns(columns.map((col) => ({ ...col, editable: true })));
        setRows(rows);
      });
    } else if (activeTab === "Messages") {
      getMessagesTable(currentFlowId, "union").then((data) => {
        const { columns, rows } = data;
        setColumns(columns.map((col) => ({ ...col, editable: true })));
        setRows(rows);
      });
    }
  }, [open, activeTab]);

  const [nameLists, setNameList] = useState<string[]>([]);

  useEffect(() => {
    const tempNameList: string[] = [];
    flows.forEach((flow: FlowType) => {
      if ((flow.is_component ?? false) === false) tempNameList.push(flow.name);
    });
    setNameList(tempNameList.filter((name) => name !== currentFlow!.name));
  }, [flows]);

  return (
    <BaseModal open={open} setOpen={setOpen} size="large">
      <BaseModal.Header
        description={
          activeTab === "Transactions"
            ? "this is going to be a description"
            : "this is going to be a description"
        }
      >
        <div className="flex w-full justify-between">
          <div className="flex h-fit w-32 items-center">
            <span className="pr-2">Logs</span>
            <IconComponent name="ScrollText" className="mr-2 h-4 w-4 " />
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className={"api-modal-tabs inset-0 m-0 self-center"}
          >
            <TabsList>
              <TabsTrigger value={"Transactions"}>Transactions</TabsTrigger>
              <TabsTrigger value={"Messages"}>Messages</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex h-fit w-32 items-center"></div>
        </div>
      </BaseModal.Header>
      <BaseModal.Content>
        <TableComponent
          readOnlyEdit
          className="h-max-full h-full w-full"
          pagination={rows.length === 0 ? false : true}
          columnDefs={columns}
          autoSizeStrategy={{ type: "fitGridWidth" }}
          rowData={rows}
          headerHeight={rows.length === 0 ? 0 : undefined}
        ></TableComponent>
      </BaseModal.Content>
    </BaseModal>
  );
}
