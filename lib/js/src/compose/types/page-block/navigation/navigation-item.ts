import { Apply } from '../../../../cast'
import { PageBlock } from '../base';

interface DropdownItem {
  label: string;
  url: string;
  delimiter: boolean;
  target: string;
}

interface Dropdown {
  label: string;
  items: DropdownItem[]
}

interface ItemOptions {
  label: string;
  url: string;
  target: string;
  delimiter: boolean;
  pageID: string;
  displaySubPages: boolean;
  dropdown: Dropdown;
  align: string;
}

interface NavigationItemOptions {
  enabled: boolean;
  textColor: string;
  backgroundColor: string;
  item: ItemOptions;
}

export type NavigationItemInput = Partial<NavigationItem> | NavigationItem

const defOptions = {
  enabled: true,
  textColor: '#0B344E',
  backgroundColor: '',
  item: {
    label: '',
    url: '',
    target: '',
    delimiter: false,
    pageID: '',
    displaySubPages: false,
    align: 'bottom',
    dropdown: {
      label: "",
      items: []
    },
  },
}

export default class NavigationItem extends PageBlock {
  public type = ''

  public options: NavigationItemOptions = { ...defOptions }

  constructor (i?: NavigationItemInput) {
    super(i)
    this.apply(i)
  }

  apply (i?: NavigationItemInput): void {
    if (!i) return

    Apply(this, i, String, 'type')

    if (i.options) {
      this.options = { ...this.options, ...i.options }
    }

    if (i.options?.item.url) {
      this.options.item.url = this.checkValidURL(i.options.item.url)
    }
  }
}
