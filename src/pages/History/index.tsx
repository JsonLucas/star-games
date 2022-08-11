import { Fragment } from "react";
import Header from "../../components/Header";
import HistoryList from "../../components/HistoryList";

export default function History() {
    return (
        <Fragment>
            <Header />
            <HistoryList />
        </Fragment>
    );
}