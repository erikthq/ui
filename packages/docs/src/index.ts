import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { HomePage } from './pages/home'
import { IntroPage } from './pages/intro'
import { ButtonPage } from './pages/button'
import { TextFieldPage } from './pages/text-field'
import { TypographyPage } from './pages/typography'
import { TextareaPage } from './pages/textarea'
import { FileDropPage } from './pages/file-drop'
import { ExpanderPage } from './pages/expander'
import { LoadingPage } from './pages/loading'
import { ThemesPage } from './pages/themes'
import { ProsePage } from './pages/prose'
import { AccordionPage } from './pages/accordion'
import { DialogPage } from './pages/dialog'
import { CodePage } from './pages/code'
import { KbdPage } from './pages/kbd'
import { CardPage } from './pages/card'
import { ButtonGroupPage } from './pages/button-group'
import { CheckboxPage } from './pages/checkbox'
import { SwitchPage } from './pages/switch'
import { SliderPage } from './pages/slider'
import { TooltipPage } from './pages/tooltip'
import { PopoverPage } from './pages/popover'
import { RadioPage } from './pages/radio'
import { SeparatorPage } from './pages/separator'
import { ProgressPage } from './pages/progress'
import { ColorInputPage } from './pages/color-input'
import { DateInputPage } from './pages/date-input'
import { TablePage } from './pages/table'
import { TogglePage } from './pages/toggle'
import { ToggleGroupPage } from './pages/toggle-group'
import { IconsPage, IconsData, IconsFilledData } from './pages/icons'
import { CustomizationPage } from './pages/customization'
import { BadgePage } from './pages/badge'
import { AvatarPage } from './pages/avatar'
import { DropdownPage } from './pages/dropdown'
import { SelectPage } from './pages/select'
import { DatalistPage } from './pages/datalist'
import { ComboboxPage } from './pages/combobox'
import { SubmenuPage } from './pages/submenu'
import { EmptyPage } from './pages/empty'
import { SkeletonPage } from './pages/skeleton'
import { MarqueePage } from './pages/marquee'
import { TreeViewPage } from './pages/tree-view'
import { MenuPage } from './pages/menu'
import { NumberFieldPage } from './pages/number-field'
import { FieldPage } from './pages/field'
import { FocusGroupPage } from './pages/focus-group'
import { BlocksPage } from './pages/blocks'
import { RichtextEditorPage } from './pages/blocks/richtext-editor'
import { SignupFormPage } from './pages/blocks/signup-form'
import { SidebarPage } from './pages/blocks/sidebar'
import { ComplexMenuPage } from './pages/blocks/complex-menu'
import { AdminDashboardPage } from './pages/blocks/admin-dashboard'
import { RadioGroupPage } from './pages/radio-group'
import { TabsPage } from './pages/tabs'
import { EasingsPage } from './pages/easings'
import { LlmsPage } from './pages/llms'
import { SkillPage } from './pages/skill'
import { SkillsPage } from './pages/skills'

const app = new Hono()

app.use('/public/*', serveStatic({ root: './src' }))

app.get('/', (c) => c.html(HomePage(c.req.path)))
app.get('/getting-started/introduction', (c) => c.html(IntroPage(c.req.path)))
app.get('/getting-started/themes', (c) => c.html(ThemesPage(c.req.path)))
app.get('/components/prose', (c) => c.html(ProsePage(c.req.path)))
app.get('/components/accordion', (c) => c.html(AccordionPage(c.req.path)))
app.get('/components/dialog', (c) => c.html(DialogPage(c.req.path)))
app.get('/components/code', (c) => c.html(CodePage(c.req.path)))
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
app.get('/components/table', (c) => c.html(TablePage(c.req.path)))
app.get('/components/toggle', (c) => c.html(TogglePage(c.req.path)))
app.get('/components/toggle-group', (c) => c.html(ToggleGroupPage(c.req.path)))
app.get('/components/button', (c) => c.html(ButtonPage(c.req.path)))
app.get('/components/text-field', (c) => c.html(TextFieldPage(c.req.path)))
app.get('/components/textarea', (c) => c.html(TextareaPage(c.req.path)))
app.get('/components/file-drop', (c) => c.html(FileDropPage(c.req.path)))
app.get('/components/expander', (c) => c.html(ExpanderPage(c.req.path)))
app.get('/components/loading', (c) => c.html(LoadingPage(c.req.path)))
app.get('/getting-started/icons', (c) => c.html(IconsPage(c.req.path)))
app.get('/icons.json', (c) => c.json(JSON.parse(IconsData())))
app.get('/icons-filled.json', (c) => c.json(JSON.parse(IconsFilledData())))
app.get('/getting-started/customization', (c) => c.html(CustomizationPage(c.req.path)))
app.get('/components/badge', (c) => c.html(BadgePage(c.req.path)))
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
app.get('/components/menu', (c) => c.html(MenuPage(c.req.path)))
app.get('/components/number-field', (c) => c.html(NumberFieldPage(c.req.path)))
app.get('/components/field', (c) => c.html(FieldPage(c.req.path)))
app.get('/components/focus-group', (c) => c.html(FocusGroupPage(c.req.path)))
app.get('/components/radio-group', (c) => c.html(RadioGroupPage(c.req.path)))
app.get('/components/tabs', (c) => c.html(TabsPage(c.req.path)))
app.get('/blocks', (c) => c.html(BlocksPage(c.req.path)))
app.get('/blocks/richtext-editor', (c) => c.html(RichtextEditorPage(c.req.path)))
app.get('/blocks/signup-form', (c) => c.html(SignupFormPage(c.req.path)))
app.get('/blocks/sidebar', (c) => c.html(SidebarPage(c.req.path)))
app.get('/blocks/complex-menu', (c) => c.html(ComplexMenuPage(c.req.path)))
app.get('/blocks/admin-dashboard', (c) => c.html(AdminDashboardPage(c.req.path)))
app.get('/getting-started/easings', (c) => c.html(EasingsPage(c.req.path)))
app.get('/typography', (c) => c.html(TypographyPage(c.req.path)))
app.get('/llms.txt', (c) => c.text(LlmsPage()))
app.get('/skill.md', (c) => c.text(SkillPage()))
app.get('/getting-started/skills', (c) => c.html(SkillsPage(c.req.path)))

export default app
