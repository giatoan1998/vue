import { createRouter, createWebHistory } from 'vue-router';
import ProgressSteps from "../components/ProgressSteps.vue";
import TodoList from "../components/TodoList.vue";
import UploadFile from "../components/UploadFile.vue";
import WikiClone from "../components/WikiClone.vue";
import RandomQuoteGenerator from "../components/RandomQuoteGenerator.vue";
import PasswordGenerator from "../components/PasswordGenerator.vue";
import GithubUsersSearch from "../components/GithubUsersSearch.vue";
import FormValidation from "../components/FormValidation.vue";
import FormValidationNew from "../components/FormValidationNew.vue";
import DadJokes from "../components/DadJokes.vue";
import AmazingCalculator from "../components/AmazingCalculator.vue";
import AccordionComponent from "../components/AccordionComponent.vue";
import CreateTag from "../components/tag-create/CreateTags.vue";
import ExpenseTracker from "../views/ExpenseTracker.vue";
import DownloadCsv from "../views/DownloadCsv.vue";

const routes = [
    { path: "/csv", component: DownloadCsv, name: "DownloadCsv" },
    { path: "/", component: ProgressSteps, name: "ProgressSteps" },
    { path: "/todo-list", component: TodoList, name: "TodoList" },
    { path: "/upload-file", component: UploadFile, name: "UploadFile" },
    { path: "/wiki-clone", component: WikiClone, name: "WikiClone" },
    { path: "/random-quote-generator", component: RandomQuoteGenerator, name: "RandomQuoteGenerator" },
    { path: "/password-generator", component: PasswordGenerator, name: "PasswordGenerator" },
    { path: "/github-users-search", component: GithubUsersSearch, name: "GithubUsersSearch" },
    { path: "/form-validation", component: FormValidation, name: "FormValidation" },
    { path: "/form-validation-new", component: FormValidationNew, name: "FormValidationNew" },
    { path: "/dad-jokes", component: DadJokes, name: "DadJokes" },
    { path: "/calculator", component: AmazingCalculator, name: "AmazingCalculator" },
    { path: "/accordion", component: AccordionComponent, name: "AccordionComponent" },
    { path: "/create-tag", component: CreateTag, name: "CreateTag" },
    { path: "/expense-tracker", component: ExpenseTracker, name: "ExpenseTracker" },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;