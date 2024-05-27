import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import { TERipple } from 'tw-elements-react';

function GroupsPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch('/api/groups')
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => console.error('Error fetching groups:', error));
    }, []);

    return (
        <>
            <div className="p-10">
                <div className="pb-10">
                    <Dropdown options={groups} />
                </div>
                {groups.map(group => (
                    <div
                        key={group._id}
                        className="block rounded-lg w-64 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                    >
                        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            {group.name}
                        </h5>
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            {group.description}
                        </p>
                        <TERipple>
                            <button
                                type="button"
                                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                                Button
                            </button>
                        </TERipple>
                    </div>
                ))}
                <div
                    className="block rounded-lg w-64 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <h5
                        className="mb-2 text-xl pb-10 font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        Пример как будет выглядеть
                    </h5>

                    <TERipple>
                        <button
                            type="button"
                            className="inline-block  rounded  px-6 pb-2 pt-2.5 bg-sky-700 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            Переглянути
                        </button>
                    </TERipple>
                </div>
            </div>

        </>
    );
}

export default GroupsPage;
