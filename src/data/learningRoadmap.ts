import type { LearningStage, LearningTopic } from "../types/learning";

export const learningStages: LearningStage[] = [
  {
    id: "testing-basics",
    title: "测试基础",
    order: 1,
    goal: "先知道软件测试是什么，以及测试人员每天在做什么。",
    description:
      "这一阶段不急着学工具，先建立基本概念：什么是需求、什么是测试用例、怎么发现和描述问题。",
    topicIds: ["what-is-testing", "test-case-basics"],
  },
  {
    id: "tools-basics",
    title: "计算机和工具基础",
    order: 2,
    goal: "补齐做测试常用的电脑、命令行、数据库和版本管理基础。",
    description:
      "测试工作经常需要看日志、查数据库、用 Git 管代码。这里会用小任务一点点练起来。",
    topicIds: ["browser-devtools", "git-basics"],
  },
  {
    id: "python-basics",
    title: "Python 编程基础",
    order: 3,
    goal: "能看懂简单脚本，并为后面的接口测试和自动化测试做准备。",
    description:
      "Python 先学最常用的语法和小脚本，不一开始追求复杂算法。",
    topicIds: ["python-variables"],
  },
];

export const learningTopics: LearningTopic[] = [
  {
    id: "what-is-testing",
    title: "软件测试是什么",
    stageId: "testing-basics",
    level: "入门",
    summary: "软件测试就是在软件交给用户前，尽量发现问题并说明风险。",
    beginnerExplanation:
      "你可以把软件测试理解成“替用户提前试用”。测试人员会按照需求去操作软件，看看它是否能正常完成任务，也会尝试一些容易出错的情况。",
    whyItMatters:
      "如果没有测试，很多问题会直接出现在真实用户面前，影响体验、业务甚至安全。",
    workScenario:
      "比如一个登录页面，测试人员会检查正确账号能不能登录、错误密码有没有提示、空输入会不会报错、页面是否容易理解。",
    prerequisites: [],
    practice:
      "打开一个你常用的网站，写下 3 个你认为必须正常工作的功能，并尝试找出 1 个可能出错的场景。",
    doneCriteria: [
      "能用自己的话解释软件测试的目的。",
      "能举出至少 3 个生活化或工作中的测试例子。",
      "知道测试不是随便点点，而是有目标地发现问题。",
    ],
  },
  {
    id: "test-case-basics",
    title: "测试用例基础",
    stageId: "testing-basics",
    level: "入门",
    summary: "测试用例是一份告诉你测什么、怎么测、期望结果是什么的小清单。",
    beginnerExplanation:
      "测试用例可以理解成测试步骤说明书。它会写清楚前提、操作步骤、输入数据和预期结果，避免测试时只凭感觉。",
    whyItMatters:
      "有了测试用例，同一个功能可以被稳定复查，也方便团队知道某个问题是怎么被发现的。",
    workScenario:
      "测试注册功能时，用例会写清楚：输入合法手机号、验证码和密码后，点击注册，应该注册成功并进入首页。",
    prerequisites: ["what-is-testing"],
    practice:
      "为“登录功能”写 3 条测试用例：正确登录、错误密码、账号为空。",
    doneCriteria: [
      "能说出测试用例至少包含步骤和预期结果。",
      "能为一个简单功能写出 3 条测试用例。",
    ],
  },
  {
    id: "browser-devtools",
    title: "浏览器开发者工具",
    stageId: "tools-basics",
    level: "基础",
    summary: "开发者工具可以帮助你查看网页结构、网络请求和错误信息。",
    beginnerExplanation:
      "浏览器不只是用来打开网页，它还藏着一个检查工具。测试网页时，你可以用它看按钮有没有报错、接口有没有失败、页面加载了哪些资源。",
    whyItMatters:
      "很多 Web 测试问题需要证据，开发者工具能帮你截图、看请求、找报错。",
    workScenario:
      "当页面点击按钮没有反应时，测试人员会打开 Console 看有没有报错，也会看 Network 里接口是否请求失败。",
    prerequisites: ["what-is-testing"],
    practice:
      "在 Chrome 或 Edge 中按 F12，打开 Network 面板，刷新网页，观察出现了哪些请求。",
    doneCriteria: [
      "能打开浏览器开发者工具。",
      "知道 Console 用来看错误，Network 用来看请求。",
    ],
  },
  {
    id: "git-basics",
    title: "Git 基础",
    stageId: "tools-basics",
    level: "基础",
    summary: "Git 用来记录代码和文档的变化，方便团队协作。",
    beginnerExplanation:
      "Git 像一个项目变化记录本。你可以知道文件什么时候改了、谁改了、为什么改，也可以把一次改动提交成一个记录。",
    whyItMatters:
      "测试人员经常需要查看版本、提交测试脚本、协助定位某次改动引入的问题。",
    workScenario:
      "当一个功能昨天还正常、今天坏了，团队可能会用 Git 查看最近改了哪些文件。",
    prerequisites: [],
    practice:
      "在一个测试文件夹中运行 `git status`，观察 Git 如何显示当前文件状态。",
    doneCriteria: [
      "知道 Git 是用来管理项目版本的。",
      "能理解工作区、提交和分支的大概含义。",
    ],
  },
  {
    id: "python-variables",
    title: "Python 变量和基础类型",
    stageId: "python-basics",
    level: "入门",
    summary: "变量用来给数据起名字，方便脚本后续使用。",
    beginnerExplanation:
      "你可以把变量理解成一个贴了标签的小盒子。比如 `username = \"test_user\"`，就是把用户名放进 username 这个盒子里。",
    whyItMatters:
      "测试脚本会经常保存账号、密码、接口地址、期望结果等数据，变量是写脚本的起点。",
    workScenario:
      "写接口测试时，你可能会把登录地址保存成变量，后面多个测试步骤都能复用它。",
    prerequisites: [],
    practice:
      "写一个 Python 小脚本，定义用户名、密码和年龄三个变量，并用 print 输出。",
    doneCriteria: [
      "能解释变量的作用。",
      "能写出字符串、数字和布尔值变量。",
    ],
  },
];

export function getStageById(stageId: string) {
  return learningStages.find((stage) => stage.id === stageId);
}

export function getTopicById(topicId: string) {
  return learningTopics.find((topic) => topic.id === topicId);
}

export function getTopicsByStageId(stageId: string) {
  return learningTopics.filter((topic) => topic.stageId === stageId);
}
