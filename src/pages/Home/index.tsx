import { Fragment } from "react";
import Header from "../../components/Header";
import Products from "../../components/Products";

export default function Home () {
    return (
        <Fragment>
            <Header />
            <Products />
        </Fragment>
    );
}