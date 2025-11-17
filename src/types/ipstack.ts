export interface IpstackResponse {
ip: string
type?: string
continent_code?: string
continent_name?: string
country_code?: string
country_name?: string
region_code?: string
region_name?: string
city?: string
zip?: string
latitude: number;
longitude: number;
location?: {
geoname_id?: number
capital?: string
languages?: Array<{ code:string; name:string; native:string }> | null
country_flag?: string
calling_code?: string
is_eu?: boolean
timezone?: { id?: string; current_time?: string; gmt_offset?: number; code?: string; is_daylight_saving?: boolean }
}
connection?: {asn?: number; isp?: string}
}