import Vue from "vue";

import {
  ModalPlugin,
  ButtonPlugin,
  VBTooltipPlugin,
  FormPlugin,
  FormSelectPlugin,
  FormTextareaPlugin,
  FormInputPlugin,
  CardPlugin,
  DropdownPlugin,
  LayoutPlugin,
  TooltipPlugin,
  AlertPlugin,
  CollapsePlugin,
  FormRadioPlugin,
  ProgressPlugin,
  SpinnerPlugin,
  BFormInvalidFeedback,
  FormGroupPlugin,
  TabsPlugin,
  PaginationPlugin,
  BadgePlugin,
  InputGroupPlugin,
  OverlayPlugin,
  FormCheckboxPlugin,
  AvatarPlugin,
  NavPlugin,
  NavbarPlugin,
  SkeletonPlugin,
} from "bootstrap-vue";

Vue.use(FormPlugin);
Vue.use(CollapsePlugin);
Vue.use(AlertPlugin);
Vue.use(LayoutPlugin);
Vue.use(TooltipPlugin);
Vue.use(ModalPlugin);
Vue.use(ButtonPlugin);
Vue.use(VBTooltipPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormSelectPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(TabsPlugin);
Vue.use(PaginationPlugin);
Vue.use(BadgePlugin);
Vue.use(FormTextareaPlugin);
Vue.use(FormRadioPlugin);
Vue.use(ProgressPlugin);
Vue.use(SpinnerPlugin);
Vue.use(CardPlugin);
Vue.use(DropdownPlugin);
Vue.use(InputGroupPlugin);
Vue.use(OverlayPlugin);
Vue.use(AvatarPlugin);
Vue.use(NavPlugin);
Vue.use(NavbarPlugin);
Vue.use(SkeletonPlugin);

Vue.component("BFormInvalidFeedback", BFormInvalidFeedback);
