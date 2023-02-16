import Hero from "@/components/home/hero";
import Content from "@/components/shared/content";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function SingleVeg() {
    const router = useRouter();
    const [book, setBook] = useState(null);
    const { bookId } = router.query;
    
    useEffect(() => {
        if (!vegId) return;

        getVeg(vegId);
    }, [vegId]);

    const getVeg = async (id) => {
        const response = await fetch(`/api/veg-by-id?id=${id}`);
        const data = await response.json();
        const { veg } = data;
        setBook(veg);
    }

    console.log(veg);

    if (!veg) {
        return (
            <div>Loading...</div>
        )
    }
    

    return (
        <div className="w-full font-manrope">
            <Header name={veg.type} />

            <Hero
                imgUrl={veg.imgurl}
                title={veg.type}
                subtitle={veg.variety}
            />

            <Content>
                <div className="w-full flex flex-col">

                    <div className="">
                        <CopyToClipboard text={veg.linkToPurchase}>
                            <button
                                className="bg-green text-white font-manrope px-4 py-2 rounded-lg"
                                type="button"
                            >
                                Copy link to Amazon
                            </button>
                        </CopyToClipboard>
                    </div>

                    <a href={veg.linkToPurchase} target="_blank">
                        Buy seeds
                    </a>

                </div>
            </Content>

            <Footer
                title="Next vegetable"
                href={`/single-veg/${+veg.id + 1}`}
            />
        </div>
    )
}