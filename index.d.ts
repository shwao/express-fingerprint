export = Fingerprint;

declare function Fingerprint(parameters: any): any;

declare namespace Fingerprint
{
    function acceptHeaders(): void;

    function dnt(): void;

    function geoIp(): void;

    function ip(): void;

    function useragent(): void;

    interface FingerprintData
    {
        hash: string;
        components: {
            useragent: {
                browser: {
                    family: string;
                    version: string;
                    major: string;
                    minor: string;
                    patch: string;
                };
                os: {
                    family: string;
                    version: string;
                    major: string;
                    minor: string;
                    patch: string;
                };
                device: {
                    family: string;
                    version: string;
                };
            };
            acceptHeaders: {
                accept: string;
                encoding: string;
                language: string;
            };
            geoip: {
                country: string;
                region: string;
                city: string;
                coordinates: {
                    latitude: number;
                    longitude: number;
                };
            };
            ip: string;
            dnt: boolean;
        };
    }
}
