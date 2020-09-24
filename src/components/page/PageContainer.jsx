import React, { Component } from "react";
import PageIndicator from "components/page/PageIndicator";

export default class PageContainer extends Component {
  state = {
    isScrolling: false,
    isTouching: false,
    touchY: 0,
    page: 0
  };
  componentDidMount() {
    var passive = { passive: false };
    document.addEventListener("touchstart", this.onTouchStart, passive);
    document.addEventListener("touchend", this.onTouchEnd, passive);
    document.addEventListener("touchmove", this.onTouchMove, passive);
    document.addEventListener("wheel", this.onWeel, passive);
    window.addEventListener("resize", this.onResize);
    this.onResize();
    var page = this.getCookie("page");
    if (page) {
      this.scroll(parseInt(page));
    } else {
      this.scroll(this.state.page);
    }
  }
  componentWillUnmount() {
    document.cookie = "page=" + this.state.page;
  }
  getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = document.cookie; //decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  onResize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    this.scroll(this.state.page);
  };
  onTouchStart = (event) => {
    this.setState({ touchY: event.touches[0].screenY, isTouching: true });
  };
  onTouchEnd = (event) => {
    this.setState({ touchY: 0, isTouching: false });
  };
  onTouchMove = (event) => {
    event.preventDefault();
    event.returnValue = false;
    var { isTouching, isScrolling, touchY, page } = this.state;
    var maxPages = this.getPagesCount() - 1;
    if (!isTouching) {
      return;
    }
    if (isScrolling) {
      return;
    }

    var delta = event.touches[0].screenY - touchY;
    if (delta <= 100 && delta >= -100) {
      return;
    }
    touchY = event.touches[0].screenY;
    this.setState({ isScrolling: true, isTouching: false }, () => {
      if (delta > 100) {
        page--;
      } else if (delta < -100) {
        page++;
      }

      if (page < 0) {
        page = 0;
      }
      if (page > maxPages) {
        page = maxPages;
      }

      this.scroll(page);
    });
  };
  onWeel = (event) => {
    event.preventDefault();
    event.returnValue = false;
    var { isScrolling, page } = this.state;
    var maxPages = this.getPagesCount() - 1;
    if (isScrolling) {
      return;
    }
    this.setState({ isScrolling: true }, () => {
      if (event.deltaY > 0) {
        page++;
      } else if (event.deltaY < 0) {
        page--;
      }
      if (page < 0) {
        page = 0;
      }
      if (page > maxPages) {
        page = maxPages;
      }
      this.scroll(page);
    });
  };
  onPageUp = () => {
    var { page } = this.state;
    page--;
    if (page < 0) {
      page = 0;
    }
    this.scroll(page);
  };
  onPageDown = () => {
    var { page } = this.state;
    var maxPages = this.getPagesCount() - 1;
    page++;
    if (page > maxPages) {
      page = maxPages;
    }
    this.scroll(page);
  };
  scroll = (page) => {
    window.scroll({ top: page * window.innerHeight, behavior: "smooth" });

    document.cookie = "page=" + page;
    this.setState({ page });
    setTimeout(() => {
      this.setState({ isScrolling: false });
    }, 500);
  };
  getPagesCount = () => {
    var pages = 0;
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        pages = this.props.children.length;
        var delta = 0;
        for (var i = 0; i < pages; i++) {
          if (Array.isArray(this.props.children[i])) {
            delta += this.props.children[i].length - 1;
          }
        }
        pages += delta;
      } else {
        pages = 1;
      }
    }
    return pages;
  };
  render() {
    var { page } = this.state;
    var pages = this.getPagesCount();

    return (
      <div>
        {this.props.children}
        <PageIndicator
          page={page}
          pages={pages}
          onPageUp={this.onPageUp}
          onPageDown={this.onPageDown}
        />
      </div>
    );
  }
}
