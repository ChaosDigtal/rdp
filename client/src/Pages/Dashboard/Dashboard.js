import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ArchiveBoxArrowDownIcon, Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const user = {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const signout = () => {
    localStorage.setItem("authenticated", false);
}

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/rdp/signin', action: signout },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Example() {
    const [search, setSearch] = useState("");
    const [connections, setConnections] = useState([]);
    const [currentConnections, setCurrentConnections] = useState([]);
    const [signOut, setSignOut] = useState(false);

    useEffect(() => {
        console.log(localStorage.getItem("authenticated"));
        axios.post(process.env.REACT_APP_SERVER_IP + "fetch", {}).then((response) => {
            let result = response["data"];
            if (result["result"] != "success") {
                return;
            }
            result = result["data"];
            setConnections(result);
            setCurrentConnections(result);
            user.name = localStorage.getItem("name");
            user.email = localStorage.getItem("email");
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const download = (connection) => {
        var url = require("../../../src/assets/images/" + connection.connectionImage);
        console.log(url);
        fetch(url).then(response => response.blob()).then(blob => {
            const blobURL = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobURL;
            a.style = "display:none";
            a.download = connection.connectionImage;
            document.body.appendChild(a);
            a.click();

            var file = new Blob([`User Name: ${connection.username}\nConnection Type: ${connection.connectionType}\nConnection URL: ${connection.connectionUrl}\nConnection Status: ${connection.connectionStatus}\nConnection Image: ${connection.connectionImage}\nMessage: ${connection.message}`], { type: "test/plain" });
            a.href = URL.createObjectURL(file);
            a.download = `${connection.username}.info`;
            a.click();
        });
    }

    const onChangeSearch = (string) => {
        setSearch(string);
        const current = connections.filter(function (connection) {
            return connection["username"].toLowerCase().includes(string.toLowerCase());
        });
        setCurrentConnections(current);
    }

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            {localStorage.getItem("authenticated") !== "true" && <Navigate to="/signin"></Navigate>}
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="ml-4 sm:ml-10 flex items-baseline space-x-4">
                                            <input
                                                id="search"
                                                name="search"
                                                type="search"
                                                value={search}
                                                placeholder='Search for username'
                                                onChange={(e) => onChangeSearch(e.target.value)}
                                                required
                                                className="block w-full sm:w-72 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <span className='text-white font-medium text-sm mr-2'>{user.name}</span>
                                                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <a
                                                                        href={item.href}
                                                                        onClick={item.action}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                onClick={item.action}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <main className='m-3'>
                    <div className="mx-auto max-w-full px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">

                        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-12 2xl:grid-cols-5">
                            {currentConnections.map((connection) => (
                                <a className="group bg-slate-100 px-4 pb-4 rounded-xl">
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">{connection.username}</h3>
                                    <p className="mt-1 text-md font-medium text-gray-700">{connection.connectionType}</p>
                                    {/* <ArchiveBoxArrowDownIcon className='absolute z-50 h-20 w-20' aria-hidden="false"></ArchiveBoxArrowDownIcon> */}
                                    <div
                                        className="relative aspect-h-1 aspect-w-1 w-full mt-2 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                                    >
                                        <span className={"absolute rounded-full w-5 h-5 " + (connection.connectionStatus === "online" ? "bg-green-500" : "bg-rose-600")} style={{ "left": "89%", "top": "5%" }}></span>

                                        <img
                                            src={require("../../../src/assets/images/" + connection.connectionImage)}
                                            alt=''
                                            onClick={() => {
                                                download(connection);
                                            }}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
