// app/users/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import UsageProgressBar from '../../components/UsageProgressBar';
import SimpleFormLocalStorage from '../../components/SimpleForm';

interface User {
  id: string;
  username: string;
  email: string;
  admin: boolean;
  cash_reserve: number | undefined;
  salary: number | undefined;
  yoe: number | undefined;
  profile: {
    bio: string;
    location: string;
  };
}

export default function UserProfile() {
    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const id = params.id as string; // Safely get the id
    const [usage, setUsage] = useState(0);

  useEffect(() => {
    if (id) {
      async function fetchData() {
        try {
          const res = await fetch('/user.json');
          const data: User[] = await res.json();
          const foundUser = data.find((u) => u.id === id);
          setUser(foundUser || null); // Handle the case where user is not found.
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const storedValue = localStorage.getItem("total");
    console.log("stored value: ", storedValue)
    if (storedValue !== null) {
      setUsage(Number(storedValue))
    } else {
      setUsage(0)
    }
  }, []); // Run when initialData changes

  const calculateUsage = (username: string) => {
    const storedValue = localStorage.getItem(username);
    console.log("stored value: ", localStorage.getItem(username))
    if (storedValue !== null) {
      return storedValue
    } else {
      return 0
    }
  };


  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {user.admin ? (
        <h1>{user.username}'s Admin Profile</h1>
      ) : (
        <h1>{user.username}'s Employee Profile</h1>
      )}
      <p>Email: {user.email}</p>
      {user.admin ? (
        <UsageProgressBar usage={usage} budget={user.cash_reserve} title="Dispensible Cash"/>
      ) : (
        <UsageProgressBar usage={calculateUsage(user.username)} budget={user.salary!!*user.yoe!!} title="Salary Request status" />
      )}

      {
        user.admin == false ? (
          <SimpleFormLocalStorage username={user.username} />
        ): <p></p>
      }
    </div>
  );
}