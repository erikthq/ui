import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { HomePage } from './pages/home'
import { IntroPage } from './pages/getting-started/introduction'
import { ButtonPage } from './pages/components/button'
import { TextFieldPage } from './pages/components/text-field'
import { TypographyPage } from './pages/typography'
import { TextareaPage } from './pages/components/textarea'
import { FileDropPage } from './pages/components/file-drop'
import { ExpanderPage } from './pages/components/expander'
import { LoadingPage } from './pages/components/loading'
import { ColorsPage } from './pages/getting-started/colors'
import { ThemingPage } from './pages/getting-started/theming'
import { TokensPage } from './pages/getting-started/tokens'
import { ProsePage } from './pages/components/prose'
import { AccordionPage } from './pages/components/accordion'
import { AlertPage } from './pages/components/alert'
import { ToastPage } from './pages/components/toast'
import { BreadcrumbsPage } from './pages/components/breadcrumbs'
import { CarouselPage } from './pages/components/carousel'
import { DialogPage } from './pages/components/dialog'
import { DrawerPage } from './pages/components/drawer'
import { CodePage } from './pages/components/code'
import { HeadingGroupPage } from './pages/components/heading-group'
import { KbdPage } from './pages/components/kbd'
import { TextPage } from './pages/components/text'
import { CardPage } from './pages/components/card'
import { ButtonGroupPage } from './pages/components/button-group'
import { CheckboxPage } from './pages/components/checkbox'
import { SwitchPage } from './pages/components/switch'
import { SliderPage } from './pages/components/slider'
import { TooltipPage } from './pages/components/tooltip'
import { PopoverPage } from './pages/components/popover'
import { RadioPage } from './pages/components/radio'
import { SeparatorPage } from './pages/components/separator'
import { ProgressPage } from './pages/components/progress'
import { ColorInputPage } from './pages/components/color-input'
import { DateInputPage } from './pages/components/date-input'
import { DescriptionListPage } from './pages/components/description-list'
import { TablePage } from './pages/components/table'
import { ChartPage } from './pages/components/chart'
import { TogglePage } from './pages/components/toggle'
import { ToggleGroupPage } from './pages/components/toggle-group'
import { IconsPage, IconsData, IconsFilledData, IconsMetaData } from './pages/getting-started/icons'
import { CustomizationPage } from './pages/getting-started/customization'
import { BadgePage } from './pages/components/badge'
import { ColorSwatchPage } from './pages/components/color-swatch'
import { AvatarPage } from './pages/components/avatar'
import { DropdownPage } from './pages/components/dropdown'
import { SelectPage } from './pages/components/select'
import { DatalistPage } from './pages/components/datalist'
import { ComboboxPage } from './pages/components/combobox'
import { SubmenuPage } from './pages/components/submenu'
import { EmptyPage } from './pages/components/empty'
import { SkeletonPage } from './pages/components/skeleton'
import { MarqueePage } from './pages/components/marquee'
import { TreeViewPage } from './pages/components/tree-view'
import { PaginationPage } from './pages/components/pagination'
import { TagGroupPage } from './pages/components/tag-group'
import { InputOtpPage } from './pages/components/input-otp'
import { MenuPage } from './pages/components/menu'
import { NumberFieldPage } from './pages/components/number-field'
import { FieldPage } from './pages/components/field'
import { FlowPage } from './pages/components/flow'
import { FocusGroupPage } from './pages/components/focus-group'
import { BlocksPage } from './pages/blocks'
import { RichtextEditorPage } from './pages/blocks/richtext-editor'
import { SignupFormPage } from './pages/blocks/signup-form'
import { SidebarPage } from './pages/blocks/sidebar'
import { ComplexMenuPage } from './pages/blocks/complex-menu'
import { AdminDashboardPage } from './pages/blocks/admin-dashboard'
import { RadioGroupPage } from './pages/components/radio-group'
import { TabsPage } from './pages/components/tabs'
import { TimelinePage } from './pages/components/timeline'
import { TabLinksPage } from './pages/components/tab-links'
import { EasingsPage } from './pages/getting-started/easings'
import { LlmsPage } from './pages/llms'
import { SkillsPage } from './pages/getting-started/skills'
import { RelativeTimePage } from './pages/utilities/relative-time'
import { CopyToClipboardPage } from './pages/utilities/copy-to-clipboard'

const app = new Hono()

app.use('/public/*', serveStatic({ root: './src' }))

app.get('/', (c) => c.html(HomePage(c.req.path)))
app.get('/getting-started/introduction', (c) => c.html(IntroPage(c.req.path)))
app.get('/getting-started/colors', (c) => c.html(ColorsPage(c.req.path)))
app.get('/getting-started/theming', (c) => c.html(ThemingPage(c.req.path)))
app.get('/getting-started/tokens', (c) => c.html(TokensPage(c.req.path)))
app.get('/components/prose', (c) => c.html(ProsePage(c.req.path)))
app.get('/components/accordion', (c) => c.html(AccordionPage(c.req.path)))
app.get('/components/alert', (c) => c.html(AlertPage(c.req.path)))
app.get('/components/toast', (c) => c.html(ToastPage(c.req.path)))
app.get('/components/breadcrumbs', (c) => c.html(BreadcrumbsPage(c.req.path)))
app.get('/components/carousel', (c) => c.html(CarouselPage(c.req.path)))
app.get('/components/dialog', (c) => c.html(DialogPage(c.req.path)))
app.get('/components/drawer', (c) => c.html(DrawerPage(c.req.path)))
app.get('/components/code', (c) => c.html(CodePage(c.req.path)))
app.get('/components/heading-group', (c) => c.html(HeadingGroupPage(c.req.path)))
app.get('/components/kbd', (c) => c.html(KbdPage(c.req.path)))
app.get('/components/card', (c) => c.html(CardPage(c.req.path)))
app.get('/components/button-group', (c) => c.html(ButtonGroupPage(c.req.path)))
app.get('/components/checkbox', (c) => c.html(CheckboxPage(c.req.path)))
app.get('/components/switch', (c) => c.html(SwitchPage(c.req.path)))
app.get('/components/slider', (c) => c.html(SliderPage(c.req.path)))
app.get('/components/tooltip', (c) => c.html(TooltipPage(c.req.path)))
app.get('/components/popover', (c) => c.html(PopoverPage(c.req.path)))
app.get('/components/radio', (c) => c.html(RadioPage(c.req.path)))
app.get('/components/separator', (c) => c.html(SeparatorPage(c.req.path)))
app.get('/components/progress', (c) => c.html(ProgressPage(c.req.path)))
app.get('/components/color-input', (c) => c.html(ColorInputPage(c.req.path)))
app.get('/components/date-input', (c) => c.html(DateInputPage(c.req.path)))
app.get('/components/description-list', (c) => c.html(DescriptionListPage(c.req.path)))
app.get('/components/table', (c) => c.html(TablePage(c.req.path)))
app.get('/components/chart', (c) => c.html(ChartPage(c.req.path)))
app.get('/components/toggle', (c) => c.html(TogglePage(c.req.path)))
app.get('/components/toggle-group', (c) => c.html(ToggleGroupPage(c.req.path)))
app.get('/components/button', (c) => c.html(ButtonPage(c.req.path)))
app.get('/components/text', (c) => c.html(TextPage(c.req.path)))
app.get('/components/text-field', (c) => c.html(TextFieldPage(c.req.path)))
app.get('/components/textarea', (c) => c.html(TextareaPage(c.req.path)))
app.get('/components/file-drop', (c) => c.html(FileDropPage(c.req.path)))
app.get('/components/expander', (c) => c.html(ExpanderPage(c.req.path)))
app.get('/components/loading', (c) => c.html(LoadingPage(c.req.path)))
app.get('/getting-started/icons', (c) => c.html(IconsPage(c.req.path)))
app.get('/icons.json', (c) => c.json(JSON.parse(IconsData())))
app.get('/icons-filled.json', (c) => c.json(JSON.parse(IconsFilledData())))
app.get('/icons-meta.json', (c) => c.json(JSON.parse(IconsMetaData())))
app.get('/getting-started/customization', (c) => c.html(CustomizationPage(c.req.path)))
app.get('/components/badge', (c) => c.html(BadgePage(c.req.path)))
app.get('/components/color-swatch', (c) => c.html(ColorSwatchPage(c.req.path)))
app.get('/components/avatar', (c) => c.html(AvatarPage(c.req.path)))
app.get('/components/dropdown', (c) => c.html(DropdownPage(c.req.path)))
app.get('/components/select', (c) => c.html(SelectPage(c.req.path)))
app.get('/components/datalist', (c) => c.html(DatalistPage(c.req.path)))
app.get('/components/combobox', (c) => c.html(ComboboxPage(c.req.path)))
app.get('/components/submenu', (c) => c.html(SubmenuPage(c.req.path)))
app.get('/components/empty', (c) => c.html(EmptyPage(c.req.path)))
app.get('/components/skeleton', (c) => c.html(SkeletonPage(c.req.path)))
app.get('/components/marquee', (c) => c.html(MarqueePage(c.req.path)))
app.get('/components/tree-view', (c) => c.html(TreeViewPage(c.req.path)))
app.get('/components/pagination', (c) => c.html(PaginationPage(c.req.path)))
app.get('/components/tag-group', (c) => c.html(TagGroupPage(c.req.path)))
app.get('/components/input-otp', (c) => c.html(InputOtpPage(c.req.path)))
app.get('/components/menu', (c) => c.html(MenuPage(c.req.path)))
app.get('/components/number-field', (c) => c.html(NumberFieldPage(c.req.path)))
app.get('/components/field', (c) => c.html(FieldPage(c.req.path)))
app.get('/components/flow', (c) => c.html(FlowPage(c.req.path)))
app.get('/components/focus-group', (c) => c.html(FocusGroupPage(c.req.path)))
app.get('/components/radio-group', (c) => c.html(RadioGroupPage(c.req.path)))
app.get('/components/tabs', (c) => c.html(TabsPage(c.req.path)))
app.get('/components/timeline', (c) => c.html(TimelinePage(c.req.path)))
app.get('/components/tab-links', (c) => c.html(TabLinksPage(c.req.path)))
app.get('/blocks', (c) => c.html(BlocksPage(c.req.path)))
app.get('/blocks/richtext-editor', (c) => c.html(RichtextEditorPage(c.req.path)))
app.get('/blocks/signup-form', (c) => c.html(SignupFormPage(c.req.path)))
app.get('/blocks/sidebar', (c) => c.html(SidebarPage(c.req.path)))
app.get('/blocks/complex-menu', (c) => c.html(ComplexMenuPage(c.req.path)))
app.get('/blocks/admin-dashboard', (c) => c.html(AdminDashboardPage(c.req.path)))
app.get('/getting-started/easings', (c) => c.html(EasingsPage(c.req.path)))
app.get('/typography', (c) => c.html(TypographyPage(c.req.path)))
app.get('/llms.txt', (c) => c.text(LlmsPage()))
app.get('/getting-started/skills', (c) => c.html(SkillsPage(c.req.path)))
app.get('/utilities/relative-time', (c) => c.html(RelativeTimePage(c.req.path)))
app.get('/utilities/copy-to-clipboard', (c) => c.html(CopyToClipboardPage(c.req.path)))

export default app
