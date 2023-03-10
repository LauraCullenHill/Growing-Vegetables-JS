import Input from "@/components/forms/input";
import Content from "@/components/shared/content";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { useEffect, useState } from "react";

export default function Search() {
    const [locations, setLocations] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        getLocations();
    }, []);

    const getLocations = async () => {
        const response = await fetch(`/api/locations`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        setLocations(data);
    }

    return (
        <div className="w-full">
            <Header name="Search" />

            <Content>
                <div className="w-full md:w-6/12 lg:w-4/12 flex flex-row space-x-2">
                    <Input
                        value={input}
                        onChange={value => setInput(value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-md"
                        type="button"
                    >
                        S
                    </button>
                </div>PPPU

                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                    {locations.map(location => (
                        <locationItem key={location.id} location={location} />
                    ))}                    
                </div>
            </Content>

            <Footer title="Home" href="/" />
        </div>
    )
}

