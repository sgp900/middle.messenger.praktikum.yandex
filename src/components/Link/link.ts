import { Block } from "../../utils/block";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import template from "./template.hbs";

interface LinkProps extends PropsWithRouter {
  href: string;
  class?: string;
  label: string;
  events?: Record<string, (e?: Event) => void>;
}

export class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      events: {
        click: () => {
          this.navigate();
        },
      },
      ...props,
    });
  }

  navigate() {
    this.props.router.go(this.props.href);
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

export const Link = withRouter(BaseLink);
