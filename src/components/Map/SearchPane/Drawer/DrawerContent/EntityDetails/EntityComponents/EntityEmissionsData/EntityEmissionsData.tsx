import React, { useEffect, useState } from 'react';
import DataAccordion from './DataAccordion/DataAccordion';
import EntityActionsList from './BottomViews/EntityActions/EntityActionsList';
import EntityPostsList from './BottomViews/EntityPosts/EntityPostsList';
import EntityCO2 from './BottomViews/EntityCO2/EntityCO2';

interface PageProps {
  emissionsData: { id: string; name: string; emissions: string[] }[];
  entitiesByBusinessType: object[];
  setIsEmpty: Function;
}

const EntityEmissionsData: React.FC<PageProps> = (props) => {
  const [graphData, setGraphData] = useState<any>([]);
  const [actionData, setActionData] = useState<any>([]);
  const [postData, setPostData] = useState<any>([]);

  const getEntityData = async () => {
    const dbURL = process.env.REACT_APP_DATABASE_URL;

    try {
      const emissionResponse = await fetch(
        `${dbURL}/emission/${props.emissionsData[0].id}.json`
      );
      const emissionJson = await emissionResponse.json();

      setGraphData(emissionJson.emissions);
    } catch (err) {
      console.log(err);
      setGraphData([]);
    }

    try {
      const actionRes = await fetch(
        `${dbURL}/entity_action/${props.emissionsData[0].id}.json`
      );
      const actionJson = await actionRes.json();

      setActionData(actionJson.actions);
    } catch (err) {
      console.log(err);
      setActionData([]);
    }

    try {
      const postRes = await fetch(
        `${dbURL}/entity_post/${props.emissionsData[0].id}.json`
      );
      const postJson = await postRes.json();

      setPostData(postJson.posts);
    } catch (err) {
      console.log(err);
      setPostData([]);
    }
  };

  useEffect(() => {
    if (
      graphData.length === 0 &&
      actionData.length === 0 &&
      postData.length === 0
    ) {
      props.setIsEmpty(true);
    } else {
      props.setIsEmpty(false);
    }
  }, [graphData, actionData, postData]);

  useEffect(() => {
    if (props.emissionsData && props.entitiesByBusinessType.length === 0) {
      getEntityData();
    }
  }, []);

  const sumEmissions = (emissionEntries: any[]) => {
    let totalEmissions = 0;
    emissionEntries.forEach((entry) => {
      const kgc02e = entry.kgco2e;
      totalEmissions += Number(kgc02e);
    });

    return totalEmissions;
  };

  const getConsecutiveEmissions = (emissionsData: any[]) => {
    let dataArr: any[] = [];
    emissionsData.some((data, idx) => {
      const currentPeriodEnd = new Date(data.period_end);
      if (dataArr.length === 0) {
        dataArr.push(data);
      } else {
        const currentPeriodEnd = new Date(data.period_end);
        const prevPeriodStart = new Date(
          dataArr[dataArr.length - 1]?.period_start
        );

        if (currentPeriodEnd.getMonth() === prevPeriodStart.getMonth()) {
          dataArr.push(data);
        } else {
          dataArr = [];
          return true;
        }
      }
    });

    return dataArr;
  };

  const checkFullYear = () => {
    let totalEmissions = 0;
    let yearOfData;
    const currentYear = new Date().getFullYear();
    const recentYears = [currentYear - 1, currentYear - 2];

    const sortedData = graphData.sort((a: any, b: any) => {
      const aDate = new Date(a.period_end);
      const bDate = new Date(b.period_end);
      return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
    });

    recentYears.some((year) => {
      const gasData = sortedData.filter(
        (item: any) =>
          item.measure === "gas" &&
          new Date(item.period_end).getFullYear() === year
      );
      const electricityData = sortedData.filter(
        (item: any) =>
          item.measure === "electricity" &&
          new Date(item.period_end).getFullYear() === year
      );

      let yearEmissions = sumEmissions(gasData);
      yearEmissions += sumEmissions(electricityData);

      if (yearEmissions > 0) {
        totalEmissions = yearEmissions;
        yearOfData = year;
        return true;
      }
    });
    if (totalEmissions === 0 && sortedData.length) {
      const mostRecentYear = new Date(sortedData[0].period_end).getFullYear();
      const mostRecentYearData = sortedData.filter(
        (item: any) =>
          new Date(item.period_end).getFullYear() === mostRecentYear
      );

      yearOfData = mostRecentYear;
      totalEmissions += sumEmissions(mostRecentYearData);
    }

    return {
      year: yearOfData,
      emissions: Math.round(totalEmissions).toString(),
    };
  };

  const { year, emissions } = checkFullYear();

  return (
    <div className="accordion-list">
      {graphData.length === 0 &&
      actionData.length === 0 &&
      postData.length === 0 ? (
        <div className="empty-entity-data">
          <p>This organisation hasn't submitted any data yet.</p>
        </div>
      ) : (
        <>
          <DataAccordion
            title={`C02e in ${year}`}
            titleData={`${emissions}kg`}
            bottomView={
              <EntityCO2
                name={props.emissionsData[0].name}
                graphData={graphData}
                labels={graphData.map((emission: any) => emission.measure)}
                data={graphData.map((emission: any) => emission.value)}
              />
            }
          />
          <DataAccordion
            title="actions"
            titleData={actionData.length}
            bottomView={<EntityActionsList actions={actionData} />}
          />
          <DataAccordion
            title="posts"
            titleData={postData.length}
            bottomView={<EntityPostsList posts={postData} />}
          />
        </>
      )}
    </div>
  );
};

export default EntityEmissionsData;