"use client";
import * as React from "react";
import UserCard from "@/components/user-card/user-card";
import { userQueries } from "@/services/user/queries";
import { useInView } from "react-intersection-observer";
export default function WorkingDays(): JSX.Element {
  const [offset, setOffset] = React.useState<number>(0);
  const [hasMoreData, setHasMoreData] = React.useState<boolean>(true);
  const [users, setUsers] = React.useState<any[]>([]);
  const [scrollTrigger, isInView] = useInView();
  async function loadMoreUsers() {
    if (hasMoreData) {
      const res = await userQueries.getUsers({ limit: 10, offset: offset });
      if (res.length == 0) {
        setHasMoreData(false);
      }
      if (
        !!users[users.length - 1] &&
        !!res[0] &&
        users[users.length - 1].id == res[0].id
      ) {
        res.splice(0, 1);
      }
      setUsers([...users, ...res]);
      setOffset((prevOffset) => prevOffset + 10);
    }
  }
  async function initialLoad() {
    const res = await userQueries.getUsers({ limit: 10, offset: 0 });
    setUsers(res);
  }
  React.useEffect(() => {
    initialLoad();
  }, []);
  React.useEffect(() => {
    if (isInView && hasMoreData) {
      loadMoreUsers();
    }
  }, [isInView, hasMoreData]);
  return (
    <div>
      <h1 className=" text-center text-3xl font-bold">Working Days</h1>
      <div className="flex flex-wrap items-center justify-evenly mt-9">
        {users.length > 0 &&
          users.map((user, idx) => {
            return (
              <div
                className="w-[40%] mt-8"
                key={`${user.id}-${idx}`}
              >
                <UserCard {...user} />
              </div>
            );
          })}
        {users.length == 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-6xl font-semibold">There is no data</p>
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-center">
        {(hasMoreData && (
          <div ref={scrollTrigger}>
            <p className="text-xl font-medium">Loading...</p>
          </div>
        )) || <p className="text-xl font-medium">No more posts to load</p>}
      </div>
    </div>
  );
}
