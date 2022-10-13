export interface IFooterNavLink {
  id: string;
  name: string;
  href: string;
}

export interface IFooterNavSection {
  id: string;
  title: string;
  links: IFooterNavLink[];
}

export type IFooterNavSections = {
  contact: IFooterNavSection[];
  info: IFooterNavSection[];
  company: IFooterNavSection[];
};

const sections: IFooterNavSections = {
  contact: [
    {
      id: "hours",
      title: "app:footer.links.hours.title",
      links: [
        {
          id: "time",
          name: "app:footer.links.hours.text",
          href: "/contacts",
        },
      ],
    },
    {
      id: "contacts",
      title: "app:footer.links.contacts.title",
      links: [
        {
          id: "tel1",
          name: "app:footer.links.contacts.tel1.text",
          href: "app:footer.links.contacts.tel1.link",
        },
        {
          id: "tel2",
          name: "app:footer.links.contacts.tel2.text",
          href: "app:footer.links.contacts.tel2.link",
        },
        {
          id: "tel3",
          name: "app:footer.links.contacts.tel3.text",
          href: "app:footer.links.contacts.tel3.link",
        },
        {
          id: "email",
          name: "app:footer.links.contacts.email.text",
          href: "app:footer.links.contacts.email.link",
        },
      ],
    },
  ],
  info: [
    {
      id: "customers",
      title: "app:footer.links.customers.title",
      links: [
        {
          id: "catalog",
          name: "app:footer.links.customers.catalog",
          href: "/catalog",
        },
        {
          id: "stocks",
          name: "app:footer.links.customers.stocks",
          href: "/stocks",
        },
        {
          id: "brands",
          name: "app:footer.links.customers.brands",
          href: "/brands",
        },
        {
          id: "faq",
          name: "app:footer.links.customers.faq",
          href: "/faq",
        },
      ],
    },
  ],
  company: [
    {
      id: "company",
      title: "app:footer.links.company.title",
      links: [
        {
          id: "about",
          name: "app:footer.links.company.about",
          href: "/about",
        },
        {
          id: "news",
          name: "app:footer.links.company.news",
          href: "/news",
        },
        {
          id: "contacts",
          name: "app:footer.links.company.contacts",
          href: "/contacts",
        },
      ],
    },
  ],
};

export default sections;
