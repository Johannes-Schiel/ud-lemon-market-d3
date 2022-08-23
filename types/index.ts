export { };

declare global {
    interface Venues {
        name: string;
        title: string;
        mic: string;
        is_open: string;
        tradable: string;
        currency: string;
    }
    interface ResultName {
        title: string;
        name: string;
    }
    interface LabelValuePair {
        value: string | number;
        label: string;
    }
    interface LemonMarketResponse {
        time: Date;
        previous: string;
        next: string;
        total: number;
        page: number;
        pages: number;
    }
    interface InstrumentResponse extends LemonMarketResponse {
        results: Instrument[];
    }
    interface OhlcResponse extends LemonMarketResponse {
        results: Ohlc[];
    }
    interface Ohlc {
        isin: string;
        o: number;
        h: number;
        l: number;
        c: number;
        v: number;
        pbv: number;
        t: Date;
        mic: string;
    }
    interface Instrument {
        isin: string;
        wkn: string;
        name: string;
        title: string;
        symbol: string;
        type: string;
        venues: Venues[];
    }
}
