"use client";

import { useEffect } from "react";
import { Chart } from "chart.js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();

  const [mostSold1, setMostSold1] = useState("-");
  const [mostSold2, setMostSold2] = useState("-");
  const [mostSold3, setMostSold3] = useState("-");

  const [onSale1, setOnSale1] = useState("-");
  const [onSale2, setOnSale2] = useState("-");
  const [onSale3, setOnSale3] = useState("-");

  const callDay = async () => {
    const transactionDataResponse = await fetch("/api/getTransactionData/day");

    const { status, message, transactionData } =
      await transactionDataResponse.json();

    if (status == "failed") {
      alert("Something critical failed");
      return;
    }

    const transactionDataDict = new Map();
    for (const transactionDatum of transactionData) {
      transactionDataDict.set(transactionDatum.id, transactionDatum.count);
    }

    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Minggu",
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
        ],
        datasets: [
          {
            data: [
              transactionDataDict.get("Minggu"),
              transactionDataDict.get("Senin"),
              transactionDataDict.get("Selasa"),
              transactionDataDict.get("Rabu"),
              transactionDataDict.get("Kamis"),
              transactionDataDict.get("Jumat"),
              transactionDataDict.get("Sabtu"),
            ],
            label: "Transaction Made",
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgb(109, 253, 181,0.5)",
            borderWidth: 2,
          },
        ],
      },
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token === null) {
      router.push("/signin");
    } else {
      (async () => {
        const response = await fetch("/api/getrole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const { role, id } = await response.json();

        if (role !== "EO") {
          router.push("/signin");
        }

        const mostSoldResponse = await fetch("/api/getMostSold/" + id);

        const mostSoldEvents = await mostSoldResponse.json();
        setMostSold1(mostSoldEvents.events[0]);
        setMostSold2(mostSoldEvents.events[1]);
        setMostSold3(mostSoldEvents.events[2]);

        const onSaleResponse = await fetch("/api/getOnsale/" + id);

        const onSaleEvents = await onSaleResponse.json();

        setOnSale1(onSaleEvents.events[0]);
        setOnSale2(onSaleEvents.events[1]);
        setOnSale3(onSaleEvents.events[2]);
      })();
    }

    callDay();
  }, []);

  const callMonth = async () => {
    const transactionDataResponse = await fetch(
      "/api/getTransactionData/month"
    );

    const { status, message, transactionData } =
      await transactionDataResponse.json();

    if (status == "failed") {
      alert("Something critical failed");
      return;
    }

    const transactionDataDict = new Map();
    for (const transactionDatum of transactionData) {
      transactionDataDict.set(transactionDatum.id, transactionDatum.count);
    }

    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ],
        datasets: [
          {
            data: [
              transactionDataDict.get("Jan"),
              transactionDataDict.get("Feb"),
              transactionDataDict.get("Mar"),
              transactionDataDict.get("Apr"),
              transactionDataDict.get("Mei"),
              transactionDataDict.get("Jun"),
              transactionDataDict.get("Jul"),
              transactionDataDict.get("Agu"),
              transactionDataDict.get("Sep"),
              transactionDataDict.get("Okt"),
              transactionDataDict.get("Nov"),
              transactionDataDict.get("Des"),
            ],
            label: "Transaction Made",
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgb(109, 253, 181,0.5)",
            borderWidth: 2,
          },
        ],
      },
    });
  };

  const callYear = async () => {
    const transactionDataResponse = await fetch("/api/getTransactionData/year");

    const { status, message, transactionData } =
      await transactionDataResponse.json();

    if (status == "failed") {
      alert("Something critical failed");
      return;
    }

    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          transactionData[2].id,
          transactionData[1].id,
          transactionData[0].id,
        ],
        datasets: [
          {
            data: [
              transactionData[2].count,
              transactionData[1].count,
              transactionData[0].count,
            ],
            label: "Transaction Made",
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgb(109, 253, 181,0.5)",
            borderWidth: 2,
          },
        ],
      },
    });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 flex flex-col p-6 justify-center items-center">
          <div className="flex-row align-right">
            <h1>Most Sold Ticket</h1>
            <h2>1. {mostSold1}</h2>
            <h2>2. {mostSold2}</h2>
            <h2>3. {mostSold3}</h2>
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col p-6 justify-center items-center">
          <div className="flex-row align-right">
            <h1>Onsales Event</h1>
            <h2>1. {onSale1}</h2>
            <h2>2. {onSale2}</h2>
            <h2>3. {onSale3}</h2>
          </div>
        </div>
        <div className="w-full">
          <div className="sm:w-[400px] md:w-[800px] lg:w-[1100px] h-50% flex mx-auto my-6">
            <div className="border border-black-400 pt-0 rounded-xl w-full h-fit shadow-xl">
              <canvas
                id="myChart"
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              ></canvas>
            </div>
          </div>
        </div>
        <div
          className="w-full flex rounded-md shadow-sm justify-center items-center"
          role="group"
        >
          <button
            type="button"
            onClick={callDay}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Daily
          </button>
          <button
            type="button"
            onClick={callMonth}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={callYear}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Yearly
          </button>
        </div>
      </div>
    </>
  );
}
