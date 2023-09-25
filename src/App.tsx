import { ReactNode } from "react";
import { Chart, Pies, Transform } from "rumble-charts";
import addIcon from "./assets/icons/addIcon.svg";
import loggo from "./assets/icons/logo.png";
import Table from "./components/Table";

import reportIcon from "./assets/icons/reportIcon.svg";
import workspaceIcon from "./assets/icons/workspace.svg";

function App() {
  return (
    <>
      <Drawer>
        {/* header */}
        <div className="flex items-center justify-between px-9 py-5">
          <span className="text-2xl font-bold">Order</span>
          <button className="btn btn-primary">
            <img src={addIcon} />
            Add order
          </button>
        </div>
        <div className="flex flex-1 flex-col md:px-14">
          <div className="flex gap-2">
            {/* Charts */}
            <div className="felx-1 flex gap-3 rounded-3xl bg-white px-5 py-12">
              <Charts data={85} colors={["#5F27CD", "#E2E2E2"]} />
              <Charts data={69} colors={["#16C09861", "#E2E2E2"]} />
              <Charts data={90} colors={["#FF6B6B", "#E2E2E2"]} />
              <Charts data={30} colors={["#FFC5C5", "#E2E2E2"]} />
            </div>
            {/*  */}
            <div className="w-full rounded-3xl bg-white px-9 py-5">
              <h1 className="mb-4 text-2xl">Stats Overview</h1>
              <span className="block text-gray-500">Active</span>
              <progress
                className="progress progress-info  w-full"
                value="66"
                max="100"
              ></progress>
              <span className="flex justify-end text-gray-500">63%</span>
              <span className="block text-gray-500">Inactive</span>
              <progress
                className="progress progress-error w-full p-0"
                value="88"
                max="100"
              ></progress>
              <span className="flex justify-end text-gray-500">88%</span>
            </div>
          </div>
          <div className="flex-1 py-4">
            <Table />
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default App;

const Charts = ({ data, colors }: { data: number; colors: string[] }) => {
  return (
    <div className="relative">
      <Chart
        width={100}
        height={100}
        series={[
          {
            data: [data, 100 - data],
          },
        ]}
        minY={undefined}
      >
        <Transform method={["transpose", "stack"]}>
          <Pies className="pie" combined innerRadius="90%" colors={colors} />
        </Transform>
      </Chart>
      <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        {data} %
      </span>
    </div>
  );
};

const Drawer = ({ children }: { children: ReactNode }) => (
  <>
    <label
      htmlFor="my-drawer-2"
      className="btn btn-primary drawer-button hidden lg:hidden"
    >
      Open drawer
    </label>
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex h-screen flex-col content-stretch  bg-base-200">
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side ">
        <div className="flex w-full justify-center p-3 align-middle ">
          <img src={loggo} alt="" />
        </div>
        <ul className="min-h-full w-80 p-4 text-base-content ">
          {/* Sidebar content here */}
          <li className="flex w-full content-center gap-4 rounded-lg p-3 text-center hover:bg-purple-100 active:bg-purple-300">
            <img className="h-5" src={reportIcon} alt="" />{" "}
            <a className="block">reports</a>
          </li>
          <li className="flex  w-full content-center gap-4 rounded-lg bg-blue-100 p-3 text-center text-blue-500 hover:bg-purple-100">
            <img className="h-5" src={""} alt="" /> Workspace
            <a className="block"></a>
          </li>
          <li className="flex w-full content-center gap-4 rounded-lg p-3 text-center hover:bg-purple-100 active:bg-purple-300">
            <img className="h-5" src={workspaceIcon} alt="" /> Settings
            <a
              className="
             block"
            ></a>
          </li>
        </ul>
      </div>
    </div>
  </>
);
