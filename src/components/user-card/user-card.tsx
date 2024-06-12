"use-client";
import * as React from "react";
interface IUserCardProps {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  gender: string;
  days: number;
  days_without_meetings: number;
  meeting_days: Array<{ start_day: number; end_day: number }>;
}
export default function UserCard(props: IUserCardProps): JSX.Element {
  return (
    <div className="w-full h-full rounded-md p-8 border-2">
      <div className="w-full h-full min-h-60 p-4">
        <p className="text-2xl font-bold">User - {props.id}</p>
        <p>Name: {`${props.first_name} ${props.last_name}`}</p>
        <div className="mt-2 flex justify-between">
          <p>Email: {props.email}</p>
          <p>Gender: Male</p>
        </div>
        <div className="mt-2 flex justify-between">
          <p>Days: {props.days}</p>
          <p>Days without meeting: {props.days_without_meetings} </p>
        </div>
        <p className="my-2">Meeting Days:</p>
        <div className="flex items-center flex-wrap">
          {props.meeting_days.length > 0 &&
            props.meeting_days.map((md,indx) => {
              return (
                <div key={indx} className="p-2 border-[1px] rounded-md mr-4">
                  <p>{`${md.start_day} -> ${md.end_day}`}</p>
                </div>
              );
            })}
            {
                props.meeting_days.length==0 &&(<p className="ml-8 font-semibold">Empty</p>)
            }
        </div>
      </div>
    </div>
  );
}
