import { useState, useEffect } from 'react';
import { useFetch } from './hooks';
import React from 'react';
import { Article, Multimedia, ApiResponse } from './types';

const sectionNames: string[] = [
    "arts", 
    "automobiles", 
    "books", 
    "business", 
    "fashion", 
    "food", 
    "health", 
    "home", 
    "insider", 
    "magazine", 
    "movies", 
    "nyregion", 
    "obituaries", 
    "opinion", 
    "politics", 
    "realestate", 
    "science", 
    "sports", 
    "sundayreview", 
    "technology", 
    "theater", 
    "t-magazine", 
    "travel", 
    "upshot", 
    "us", 
    "world"
];


/**
 * 
 * @param {int} min Minimum value for range
 * @param {int} max Maximum value for range
 * @returns {int} Random number between [min, max), inclusive min and exclusive max
 */
function randomNum(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}

export const SectionNames = () => {
    return (
        <div className="sections-nav">
            <ul>
                {sectionNames.map((section, index) => 
                    <li key={section}><a href={`/news/${section}`}>{section}</a></li>)}
            </ul>
        </div>
    )
}

export const FooterSectionNames = () => {
    const col1 = sectionNames.slice(0, 7).map((section: string) => {
        return (
            <li key={section}><a href={`/news/${section}`}>{section}</a></li>
        )
    });
    const col2 = sectionNames.slice(7, 14).map((section: string) => {
        return (
            <li key={section}><a href={`/news/${section}`}>{section}</a></li>
        )
    });
    const col3 = sectionNames.slice(14, 21).map((section: string) => {
        return (
            <li key={section}><a href={`/news/${section}`}>{section}</a></li>
        )
    });
    const col4 = sectionNames.slice(21).map((section: string) => {
        return (
            <li key={section}><a href={`/news/${section}`}>{section}</a></li>
        )
    });
    return (
        <div className="footer-content">
            <ul>
                {col1}
            </ul>
            <ul>
                {col2}
            </ul>
            <ul>
                {col3}
            </ul>
            <ul>
                {col4}
            </ul>
        </div>
    )
}

const RightSidebarFeatured = (props: any) => {
    const articles = props.data;
    const limit = props.limit;

    let listItems = articles.results?.map((article: Article) =>
        <li className="right-list-item" key={article.uri}>
            <div className="featured-right">
                <a href={article.url}><Image data={articles} articleTitle={article.title} /></a>
                <h3><a href={article.url}>{article.title}</a></h3>
            </div>
        </li>
    );
    if (limit && listItems) {
        listItems = listItems.slice(2, limit + 2);
    }
    return (
        <ul className="section-list">
            {listItems}
        </ul>
    )
};


const Image = (props: { data: ApiResponse, articleTitle: string }) => {
    const response: ApiResponse = props.data;
    const title: string = props.articleTitle;
    let srcStr = "";
    let fallbackSrc = "";
    let fallbackAlt = "";
    const sizes = "(max-width: 480px) 33.3vw, (max-width: 640px) 50vw, 100vw";
    let post: any = {};

    response.results?.forEach((article: Article) => {
        if (article.title === title) {
            post = article;
        }
    });

    function getVal(arr: any, index: number, prop: string | number): string {
        const type = typeof arr;
        let val = "";
        if (type === 'object' && arr && arr.length !== 0) {
            val += arr[index][prop];
        }
        return val;
    } 

    const multimedia: Multimedia[] = post["multimedia"] || [];
    let srcSet = multimedia
            .map((item: { url: string; width: number; }) => {
                return { url: item.url, width: item.width, title: post.title };
            })
            .sort((a: { width: number; }, b: { width: number; }) => a.width - b.width);

    fallbackSrc = getVal(srcSet, 0, "url");
    fallbackAlt = getVal(srcSet, 0, "title");

    srcSet.forEach((a: { url: any; width: any; }, index: number) => {
        if (index !== srcSet.length - 1) {
            srcStr += `${a.url} ${a.width}w, `;
        } else {
            srcStr += `${a.url} ${a.width}w`;
        }
    });
    
    return (
        <picture>
            <source type="image/jpeg" srcSet={srcStr} sizes={sizes} />
            <img srcSet={srcStr} sizes={sizes} className="responsive-img" src={fallbackSrc} alt={fallbackAlt} loading="lazy" />
        </picture>
    )
};

// Home page grid
const TopLeft = (props: { data: ApiResponse }) => {
    const articles: Article[] = props.data.results;
    let postOne: Article | any = [];
    let postTwo: Article | any = [];
    let dateOne: Date | any = "";
    let dateTwo: Date | any = "";
    
    if (articles) {
        postOne = articles[0];
        postTwo = articles[1];
        dateOne = new Date(articles[0].created_date).toDateString();
        dateTwo = new Date(articles[1].created_date).toDateString();
    }

    const titleOne = postOne.title;
    const abstractOne = postOne.abstract;
    const titleTwo = postTwo.title;
    const abstractTwo = postTwo.abstract;

    return (
        <div className="top-left">
            <div className="tl-row">
                <div className="tl-content">
                    <h2><a href={postOne.url}>{titleOne}</a></h2>
                    <p id="tl-date-one" className="post-date hidden">{dateOne}</p>
                    <p className="abstract">{abstractOne}</p>
                    <a className="read-more" href={postOne.url}><strong>Read more</strong> <span>{String.fromCharCode(0x27F6)}</span></a>
                </div>
                <a href={postOne.url} aria-label={`Image for article: ${titleOne}`}>
                    <Image articleTitle={titleOne} data={props.data} />
                </a>
            </div>
            <div className="tl-bottom">
                <div className="tlb-inner">
                    <a href={postTwo.url} aria-label={`Image for article: ${titleTwo}`}>
                        <Image articleTitle={titleTwo} data={props.data} />
                    </a>
                    <div>
                        <h3><a href={postTwo.url}>{titleTwo}</a></h3>
                        <p className="post-date">{dateTwo}</p>
                    </div>
                </div>
                <p className="abstract">{abstractTwo}</p>
                <a className="read-more" href={postTwo.url}><strong>Read more</strong> <span>{String.fromCharCode(0x27F6)}</span></a>
            </div>
        </div>
    )
};

// Types for Stateful component below

type TopMiddleProps = {
    data: ApiResponse,
    index: number
};

type TopMiddleState = {
    response: ApiResponse,
    articles: Article[],
    title: string,
    abstract: string,
    byline: string,
    date: Date | string,
    time: Date | string,
    url: string
}

// Use functional component with useState and useEffect
const TopMiddle = (props: TopMiddleProps) => {
    const articles: Article[] = props.data.results;

    const state: TopMiddleState = {
        response: props.data,
        articles: props.data.results,
        title: !articles ? "" : articles[props.index].title,
        abstract: !articles ? "" : articles[props.index].abstract,
        byline: !articles ? "" : articles[props.index].byline,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        url: ""
    };

    // compound state updates for data state variable
    // could be moved to a custom hook to avoid complex
    // state updates inside the component
    const [status, setStatus] = useState("idle");
    const [index, setIndex] = useState(props.index || 5);
    const [data, setData] = useState(state);

    // everytime the component receives new props, or
    // the state variable `index` is updated with setIndex()
    // run the useEffect and update data
    useEffect(() => {
        setStatus("state updated");
        setData({
            ...data,
            title: !articles ? "" : articles[index].title,
            abstract: !articles ? "" : articles[index].abstract,
            byline: !articles ? "" : articles[index].byline,
            date: !articles ? new Date().toLocaleDateString() : new Date(articles[index].created_date).toLocaleDateString(),
            time: !articles ? new Date().toLocaleDateString() : new Date(articles[index].created_date).toLocaleTimeString(),
            url: !articles ? "" : articles[index].url
        });
        // come back and fix this xD
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, index]);
    
    function prev(): void {
        if (index === 0) {
            setIndex(index => index + props.data.results?.length - 1);
        } else {
        setIndex(index => index - 1);
        }
    }

    function next(): void {
        let length= props.data.results?.length;
        if (index === length - 1) {
            setIndex(index => index - --length)
        } else {
            setIndex(index => index + 1);
        }
    }

    return (
        <div className="top-middle" data-status={status}>
            <a href={data.url}><Image articleTitle={data.title} data={props.data} /></a>
            <div className="row">
                <strong>TRENDING</strong>
                <div className="prev-next">
                    <button onClick={prev}>&lt;</button>
                    <button onClick={next}>&gt;</button>
                </div>
            </div>
            <h2><a href={data.url}>{data.title}</a></h2>
            <p className="post-date">Posted at {data.time} - {data.date}</p>
            <p>{data.abstract}</p>
            <div className="author-corner">
                <p>{data.byline}</p>
            </div>
        </div>
    )
};

// Class style stateful component for Form
class SubscribeForm extends React.Component<{}, { value: string }> {
    constructor(props: any) {
        super(props);
        this.state = { 
            value : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: any) {
        alert(`The email '${this.state.value}' is now subscribed! 🎉 \n\nDon't worry, your not actually subscribed to anything, this is just for show :)`);
        event.preventDefault();
        // reset form and state
        event.target.reset();
        this.setState({ value: "" });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="email" id="sub-email" 
                    placeholder="Enter email address" 
                    name="email" 
                    required
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <button type="submit">Sign me up</button>
            </form>
        )
    }
}

const TopRight = (props: { data: ApiResponse }) => {
    const articles: ApiResponse = props.data;
    return (
        <div className="top-right">
            <div className="ad">
                <div className="ad-info">
                    <strong>Cipher News Group</strong>
                    <p>Everyday news outlet from 12:00am-12:00pm</p>
                    <a href="#article-list">Start Reading</a>
                </div>
                <div className="ad-support">
                    <svg width="100" height="100" enableBackground="new 0 0 512.042 512.042" viewBox="0 0 512.042 512.042" xmlns="http://www.w3.org/2000/svg"><g><g><g><path d="m446.999 477c0-18.918 0-244.152 0-375l-92-92h-339.96v467c0 13.81 11.19 25 25 25h426.96c-.16-.2-.33-.41-.49-.61-11.17-2.5-19.51-12.47-19.51-24.39z" fill="#faf7f5"/><path d="m354.999 102h92l-92-92z" fill="#e6e6f9"/><path d="m497 55.998v421c.22 15.88-15.33 28.16-30.71 24.33-11.07-2.39-19.46-13.02-19.29-24.33v-375l-46-46z" fill="#b5b3ee"/><path d="m62.022 328.388h126.63v126.63h-126.63z" fill="#fff2a0"/></g></g><g><path d="m59.045 132.603c-4.178 1.302-7.023 5.17-7.023 9.547v79.85c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10v-47.771l35.765 51.79c2.94 4.245 7.837 6.051 12.487 4.599 4.743-1.482 7.808-5.922 7.808-11.409l-.748-77.304c-.054-5.49-4.521-9.903-9.998-9.903-.032 0-.066 0-.099.001-5.522.053-9.956 4.574-9.903 10.096l.473 48.753-37.556-54.383c-2.488-3.602-7.024-5.168-11.206-3.866z"/><path d="m190.735 152.001c5.522 0 10-4.477 10-10s-4.478-10-10-10h-33.401c-5.523 0-10 4.477-10 10v79.27c0 5.523 4.477 10 10 10h33.401c5.522 0 10-4.477 10-10s-4.478-10-10-10h-23.401v-19.635h20.938c5.522 0 10-4.477 10-10s-4.478-10-10-10h-20.938v-19.635z"/><path d="m375.944 212.001c-7.951 0-15.603-3.205-20.468-8.574-3.71-4.092-10.032-4.403-14.125-.694s-4.403 10.033-.695 14.125c8.594 9.482 21.785 15.144 35.288 15.144 16.859 0 31.017-10.758 33.663-25.581 1.992-11.154-3.071-25.726-23.256-33.171-9.826-3.625-18.975-7.572-21.783-8.802-2.177-1.751-2.104-4.189-1.958-5.206.203-1.412 1.228-4.863 6.364-6.41 11.274-3.398 21.732 4.864 22.017 5.091 4.226 3.505 10.497 2.947 14.037-1.264 3.554-4.228 3.007-10.536-1.221-14.089-.756-.635-18.739-15.472-40.603-8.887-11.044 3.327-18.857 12.032-20.392 22.718-1.439 10.026 2.907 19.671 11.343 25.17.441.288.905.541 1.387.755.463.207 11.48 5.11 23.887 9.688 3.508 1.294 11.551 4.945 10.489 10.891-.797 4.471-6.244 9.096-13.974 9.096z"/><path d="m283.627 139.056c-1.627-5.278-7.222-8.242-12.501-6.612-3.585 1.104-6.095 4.041-6.831 7.465l-14.508 46.873-9.242-46.722c-1.071-5.418-6.332-8.94-11.75-7.87-5.418 1.072-8.941 6.332-7.869 11.75l15.587 78.798c.094.478.224.949.387 1.408 1.672 4.706 6.136 7.853 11.124 7.853h.078c5.021-.033 9.48-3.249 11.099-8.001.029-.088.059-.177.086-.267l14.785-47.766 14.719 47.777c.042.135.086.27.134.404 1.672 4.706 6.136 7.853 11.124 7.853h.082c5.022-.035 9.48-3.252 11.096-8.006.141-.414.255-.837.34-1.266l15.648-78.629c1.078-5.416-2.439-10.681-7.855-11.759-5.416-1.081-10.682 2.439-11.76 7.856l-9.271 46.579z"/><circle cx="241.019" cy="502.018" r="10"/><path d="m497.001 45.998h-91.862l-43.069-43.069c-1.876-1.875-4.419-2.929-7.071-2.929h-339.959c-5.523 0-10 4.477-10 10v467c0 19.299 15.701 35 35 35h155.979c5.522 0 10-4.477 10-10s-4.478-10-10-10h-155.979c-8.271 0-15-6.729-15-15v-457h319.959v82.001c0 5.523 4.478 10 10 10h82l.001 364.999c0 5.349 1.18 10.44 3.323 15h-154.304c-5.522 0-10 4.477-10 10s4.478 10 10 10c0 0 184.363.034 186.07.042 7.708 0 15.294-2.638 21.635-7.664 8.564-6.789 13.399-16.786 13.276-27.439v-420.941c.001-5.523-4.477-10-9.999-10zm-132.002-11.855 57.858 57.858h-57.858zm116.3 454.562c-3.693 2.928-8.282 3.993-12.593 2.919l-.002.01c-6.714-1.492-11.723-7.657-11.704-14.634l-.001-375c0-2.652-1.054-5.196-2.929-7.071l-28.931-28.932h61.862v411c.101 4.485-1.976 8.756-5.702 11.708z"/><path d="m288.519 66c5.523 0 10-4.477 10-10s-4.477-10-10-10h-79.809c-5.522 0-10 4.477-10 10s4.478 10 10 10z"/><path d="m81.519 66h79.811c5.523 0 10-4.477 10-10s-4.477-10-10-10h-79.811c-5.522 0-10 4.477-10 10s4.478 10 10 10z"/><path d="m81.519 106h207c5.523 0 10-4.477 10-10s-4.477-10-10-10h-207c-5.522 0-10 4.477-10 10s4.478 10 10 10z"/><path d="m62.022 318.388c-5.523 0-10 4.477-10 10v126.63c0 5.523 4.477 10 10 10h126.63c5.522 0 10-4.477 10-10v-126.63c0-5.523-4.478-10-10-10zm116.63 126.63h-106.63v-106.63h106.63z"/><path d="m410.016 274.829c0-5.523-4.477-10-10-10h-337.994c-5.523 0-10 4.477-10 10s4.477 10 10 10h337.994c5.523 0 10-4.477 10-10z"/><path d="m400.016 336.343h-151.401c-5.522 0-10 4.477-10 10s4.478 10 10 10h151.401c5.523 0 10-4.477 10-10s-4.477-10-10-10z"/><path d="m400.016 381.703h-151.401c-5.522 0-10 4.477-10 10s4.478 10 10 10h151.401c5.523 0 10-4.477 10-10s-4.477-10-10-10z"/><path d="m400.016 427.062h-151.401c-5.522 0-10 4.477-10 10s4.478 10 10 10h151.401c5.523 0 10-4.477 10-10s-4.477-10-10-10z"/></g></g></svg>
                    <p>Logo from <a href="https://www.flaticon.com/free-icon/newspaper_4097354">flaticon</a></p>
                </div>
            </div>
            <div>
                <RightSidebarFeatured data={articles} limit={3} />
            </div>
            <div className="tr-subscribe" id="main-subscribe">
                <label htmlFor="sub-email"><strong>Subscribe to all the news</strong></label>
                <p>Never miss the latest updates</p>
                <SubscribeForm />
            </div>
        </div>
    )
};

const HomeGrid = ((props: { data: ApiResponse }) => {
    const response = props.data;;
    let index = randomNum(4, response.results?.length - 1);
    return (
        <div className="home-grid">
            <TopLeft data={response} />
            <TopMiddle data={response} index={index} />
            <TopRight data={response} />
        </div>
    )
});

const ListItem = ((props: { data: ApiResponse, title: string, abstract: string, url: string}) => {
    return (
        <li className="grid-item">
            <a href={props.url}><Image data={props.data} articleTitle={props.title} /></a>
            <div className="item-content">
                <a href={props.url}><h4>{props.title}</h4></a>
                <p>{props.abstract}</p>
            </div>
        </li>
    )
});

const MainGrid = ((props: { data: ApiResponse }) => {
    const response: ApiResponse = props.data;
    const section: string = props.data.section;
    const listItems = response.results?.map((article: Article) => 
        <ListItem data={response} key={article.uri} title={article.title} abstract={article.abstract} url={article.url} />
    );
    return (
        <div className="main-list" id="article-list">
            <h3>{section}</h3>
            <ul className="main-grid">
                {listItems}
            </ul>
        </div>
    )
});

const Subsections = ((props: { data: ApiResponse }) => {
    const response: ApiResponse = props.data;
    const results: Article[] = response.results;
    
    let all: string[] = [];
    results?.forEach((article: Article) => {
        all.push(article.subsection);
    });

    let nonUniqueList: any = results?.filter((item: Article) => item.subsection);
    nonUniqueList?.shift(); // remove first element as its already begin used
    nonUniqueList = nonUniqueList?.map((item: Article) => 
        <li key={item.uri} className="subsection-related">
            <Image data={response} articleTitle={item.title} />
            <h5>{item.title}</h5>
        </li>
    );
   

    const getSubsectionList = (articleArr: Article[]) => {
        let unique: Article[] | any = [];
        
        // with duplicates and no falsy
        const subsections = articleArr?.map((article: Article) => {
            return article.subsection;
        }).filter(Boolean);

        // no duplicates and no falsy
        const uniqueSubsections: string[] = [...new Set(subsections)].filter(Boolean);

        uniqueSubsections?.forEach((subsection: string) => {
            let pos: number = articleArr?.findIndex((article: any) => {
                return article.subsection === subsection;
            });
            unique.push(articleArr[pos]);
        });
        return unique;
    }

    const uniqueSubsections = getSubsectionList(results);

    const items: any = uniqueSubsections?.map((article: Article) => 
            <li className="subsection-item" key={article.uri}>
                <div className="subsection-img">
                    <strong>{article.subsection}</strong>
                    <Image data={response} articleTitle={article.title} />
                </div>
                <div className="p-content">
                    <h4>{article.title}</h4>
                    <p className="subsection-post-date">Posted on {new Date(article.created_date).toDateString()}</p>
                    <p>{article.abstract}</p>
                    <a href={article.url}>Read more</a>
                </div>
            </li>
    );

    const EmptySubsections = (
        <div className="empty-subsections">
            <p>Oh no! It looks like there aren't any subsections for this category. We apologize!</p>
        </div>
    );

    const SubsectionList = (
        <ul className="subsection-list">
            {items}
        </ul>
    );

    return (
        <div id="subsections" className="subsection-content">
            <h4>Subsections</h4>
            {items?.length === 0 ?  EmptySubsections : SubsectionList}
        </div>
    )
});

export const NewsList = () => {
    const [query, setQuery] = useState("");
    const url: string = query && `/news?section=${query}`;

    // Use custom hook for API fetch requests
    const { status, data, error }: { 
        status: string, 
        data: any, 
        error: Error | string 
    } = useFetch(url);

    if (error) {
        console.error(error);
    }

    const section: string = window.location.pathname.slice(6);
    if (!query) {
        const q = section !== "" ? section : "arts";
        setQuery(q);
    }

    const articles = data;

    return (
        <main id="main-content" data-status={status}>
            <HomeGrid data={!articles ? 'Loading' : articles } />
            <MainGrid data={!articles ? 'Loading' : articles } />
            <Subsections data={!articles ? 'Loading' : articles } />
        </main>
    )
}

