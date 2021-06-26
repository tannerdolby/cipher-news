export interface Article {
    abstract: string,
    byline: string,
    created_date: Date,
    des_facet: string[],  
    geo_facet: string[],
    item_type: string, 
    kicker: string,
    material_type_facet: string,
    multimedia: Multimedia[],
    org_facet: string[],
    per_facet: string[],
    published_date: string,
    section: string,
    short_url: string,
    subsection: string,
    title: string,
    updated_date: Date,
    uri: string,
    url: string
};

export interface Multimedia {
    caption: string,
    copyright: string,
    format: string,
    height: number,
    subtype: string,
    type: string,
    url: string,
    width: number
};

export interface ApiResponse {
    copyright: string,
    last_updated: Date,
    num_results: number,
    results: Article[],
    section: string,
    status: string
};