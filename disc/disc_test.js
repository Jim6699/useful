document.addEventListener('DOMContentLoaded', () => {
    const nameContainer = document.getElementById('name-container');
    const questionsContainer = document.getElementById('questions-container');
    const questionTitle = document.getElementById('question-title');
    const answersContainer = document.getElementById('answers-container');

    let currentQuestionIndex = 0;
    let score = { D: 0, I: 0, S: 0, C: 0 };
    let userName = '';
    const questions = [
        {
            question: "1. 您更符合哪一项？",
            answers: [
                { text: "富于冒险:愿意面对新事物并敢于下决心掌握的人", value: "D" },
                { text: "适应力强:轻松自如适应任何环境", value: "S" },
                { text: "生动:充满活力,表情生动,多手势", value: "I" },
                { text: "善于分析:喜欢研究各部分之间的逻辑和正确的关系", value: "C" }
            ]
        },
        {
            question: "2. 您更符合哪一项？",
            answers: [
                { text: "坚持不懈：要完成现有的事才能做新的事情", value: "C" },
                { text: "喜好娱乐：开心充满乐趣与幽默感", value: "I" },
                { text: "善于说服：用逻辑和事实而不用威严和权利服人", value: "D" },
                { text: "平和：在冲突中不受干扰，保持平静", value: "S" }
            ]
        },
        {
            question: "3. 您更符合哪一项？",
            answers: [
                { text: "顺服：易接受他人的观点和喜好，不坚持己见", value: "S" },
                { text: "自我牺牲：为他人利益愿意放弃个人意见", value: "C" },
                { text: "善于社交：认为与人相处是好玩，而不是挑战或者商业机会", value: "I" },
                { text: "意志坚定：决心以自己的方式做事", value: "D" }
            ]
        },
        {
            question: "4. 您更符合哪一项？",
            answers: [
                { text: "使人认同：因人格魅力或性格使人认同", value: "I" },
                { text: "体贴：关心别人的感受与需要", value: "C" },
                { text: "竞争性：把一切当作竞赛，总是有强烈的赢的欲望", value: "D" },
                { text: "自控性：控制自己的情感，极少流露", value: "S" }
            ]
        },
        {
            question: "5. 您更符合哪一项？",
            answers: [
                { text: "使人振作：给他人清新振奋的刺激", value: "I" },
                { text: "尊重他人：对人诚实尊重", value: "C" },
                { text: "善于应变：对任何情况都能作出有效的反应", value: "D" },
                { text: "含蓄：自我约束情绪与热忱", value: "S" }
            ]
        },
        {
            question: "6. 您更符合哪一项？",
            answers: [
                { text: "生机勃勃：充满生命力与兴奋", value: "I" },
                { text: "满足：容易接受任何情况与环境", value: "S" },
                { text: "敏感：对周围的人事过分关心", value: "C" },
                { text: "自立：独立性强，只依靠自己的能力、判断、与才智", value: "D" }
            ]
        },
        {
            question: "7. 您更符合哪一项？",
            answers: [
                { text: "计划者：先做详尽的计划，并严格按计划进行，不想改动", value: "C" },
                { text: "耐性：不因延误而懊恼，冷静且能容忍", value: "S" },
                { text: "积极：相信自己有转危为安的能力", value: "D" },
                { text: "推动者：动用性格魅力或鼓励别人参与", value: "I" }
            ]
        },
        {
            question: "8. 您更符合哪一项？",
            answers: [
                { text: "肯定：自信，极少犹豫或者动摇", value: "D" },
                { text: "无拘无束：不喜欢预先计划，或者被计划牵制", value: "I" },
                { text: "羞涩：安静，不善于交谈", value: "S" },
                { text: "有时间性：生活处事依靠时间表，不喜欢计划被人干扰", value: "C" }
            ]
        },
        {
            question: "9. 您更符合哪一项？",
            answers: [
                { text: "迁就：改变自己以与他人协调，短时间内按他人要求行事", value: "S" },
                { text: "井井有条：有系统有条理安排事情", value: "C" },
                { text: "坦率：毫无保留，坦率发言", value: "I" },
                { text: "乐观：令他人和自己相信任何事情都会好转", value: "D" }
            ]
        },
        {
            question: "10. 您更符合哪一项？",
            answers: [
                { text: "强迫性：发号施令，强迫他人听从", value: "D" },
                { text: "忠诚：一贯可靠，忠心不移，有时毫无根据地奉献", value: "C" },
                { text: "有趣：风趣，幽默，把任何事物都能变成精彩的故事", value: "I" },
                { text: "友善：不主动交谈，不爱争论", value: "S" }
            ]
        },
        {
            question: "11. 您更符合哪一项？",
            answers: [
                { text: "勇敢：敢于冒险，无所畏惧", value: "D" },
                { text: "体贴：待人得体，有耐心", value: "S" },
                { text: "注意细节：观察入微，做事情有条不紊", value: "C" },
                { text: "可爱：开心，与他人相处充满乐趣", value: "I" }
            ]
        },
        {
            question: "12. 您更符合哪一项？",
            answers: [
                { text: "令人开心：充满活力，并将快乐传于他人", value: "I" },
                { text: "文化修养：对艺术学术特别爱好，如戏剧、交响乐", value: "C" },
                { text: "自信：确信自己个人能力与成功", value: "D" },
                { text: "贯彻始终：情绪平稳，做事情坚持不懈", value: "S" }
            ]
        },
        {
            question: "13. 您更符合哪一项？",
            answers: [
                { text: "理想主义：以自己完美的标准来设想衡量新事物", value: "C" },
                { text: "独立：自给自足，独立自信，不需要他人帮忙", value: "D" },
                { text: "无攻击性：不说或者做可能引起别人不满和反对的事情", value: "S" },
                { text: "富有激励：鼓励别人参与、加入，并把每件事情变得有趣", value: "I" }
            ]
        },
        {
            question: "14. 您更符合哪一项？",
            answers: [
                { text: "感情外露：从不掩饰情感，喜好，交谈时常身不由己接触他人", value: "I" },
                { text: "深沉：深刻并常常内省，对肤浅的交谈、消遣会厌恶", value: "C" },
                { text: "果断：有很快做出判断与结论的能力", value: "D" },
                { text: "幽默：语气平和而有冷静的幽默", value: "S" }
            ]
        },
        {
            question: "15. 您更符合哪一项？",
            answers: [
                { text: "调解者：经常居中调节不同的意见，以避免双方的冲突", value: "S" },
                { text: "音乐性：爱好参与并有较深的鉴赏能力，因音乐的艺术性,而不是因为表演的乐趣", value: "C" },
                { text: "发起人：高效率的推动者，是他人的领导者，闲不住", value: "D" },
                { text: "喜交朋友：喜欢周旋聚会中，善交新朋友不把任何人当陌生人", value: "I" }
            ]
        },
        {
            question: "16. 您更符合哪一项？",
            answers: [
                { text: "考虑周到：善解人意，帮助别人，记住特别的日子", value: "C" },
                { text: "执着：不达目的，誓不罢休", value: "D" },
                { text: "多言：不断的说话、讲笑话以娱乐他人，觉得应该避免沉默而带来的尴尬", value: "I" },
                { text: "容忍：易接受别人的想法和看法，不需要反对或改变他人", value: "S" }
            ]
        },
        {
            question: "17. 您更符合哪一项？",
            answers: [
                { text: "聆听者：愿意听别人倾诉", value: "S" },
                { text: "忠心对自己的理想、朋友、工作都绝对忠实，有时甚至不需要理由", value: "C" },
                { text: "领导者：天生的领导，不相信别人的能力能比上自己", value: "D" },
                { text: "活力充沛：充满活力，精力充沛", value: "I" }
            ]
        },
        {
            question: "18. 您更符合哪一项？",
            answers: [
                { text: "知足：满足自己拥有的，很少羡慕别人", value: "S" },
                { text: "首领：要求领导地位及别人跟随", value: "D" },
                { text: "制图者：用图表数字来组织生活，解决问题", value: "C" },
                { text: "惹人喜爱：人们注意的中心，令人喜欢", value: "I" }
            ]
        },
        {
            question: "19. 您更符合哪一项？",
            answers: [
                { text: "完美主义者：对自己、对别人都高标准、一切事物有秩序", value: "C" },
                { text: "和气：易相处，易说话，易让人接近", value: "S" },
                { text: "勤劳：不停的工作，完成任务，不愿意休息", value: "D" },
                { text: "受欢迎：聚会时的灵魂人物，受欢迎的宾客", value: "I" }
            ]
        },
        {
            question: "20. 您更符合哪一项？",
            answers: [
                { text: "跳跃性：充满活力和生气勃勃", value: "I" },
                { text: "无畏：大胆前进，不怕冒险", value: "D" },
                { text: "规范性：时时坚持自己的举止合乎认同的道德规范", value: "C" },
                { text: "平衡：稳定，走中间路线", value: "S" }
            ]
        },
        {
            question: "21. 您更符合哪一项？",
            answers: [
                { text: "乏味：死气沉沉，缺乏生气", value: "S" },
                { text: "忸怩：躲避别人的注意力，在众人注意下不自然", value: "C" },
                { text: "露骨：好表现，华而不实，声音大", value: "I" },
                { text: "专横：喜命令支配，有时略显傲慢", value: "D" }
            ]
        },
        {
            question: "22. 您更符合哪一项？",
            answers: [
                { text: "散漫：生活任性无秩序", value: "I" },
                { text: "无同情心：不易理解别人的问题和麻烦", value: "D" },
                { text: "缺乏热情：不易兴奋，经常感到好事难做", value: "S" },
                { text: "不宽恕：不易宽恕和忘记别人对自己的伤害，易嫉妒", value: "C" }
            ]
        },
        {
            question: "23. 您更符合哪一项？",
            answers: [
                { text: "保留：不愿意参与，尤其是当事情复杂时", value: "S" },
                { text: "怨恨：把实际或者自己想象的别人的冒犯经常放在心中", value: "C" },
                { text: "逆反：抗拒、或者拒不接受别人的方法，固执己见", value: "D" },
                { text: "唠叨：重复讲同一件事情或故事，忘记已经重复多次，总是不断找话题说话", value: "I" }
            ]
        },
        {
            question: "24. 您更符合哪一项？",
            answers: [
                { text: "挑剔：坚持琐事细节，总喜欢挑不足", value: "C" },
                { text: "胆小：经常感到强烈的担心焦虑、悲戚", value: "S" },
                { text: "健忘：缺乏自我约束，导致健忘，不愿意回忆无趣的事情", value: "I" },
                { text: "率直：直言不讳，直接表达自己的看法", value: "D" }
            ]
        },
        {
            question: "25. 您更符合哪一项？",
            answers: [
                { text: "没耐性：难以忍受等待别人", value: "D" },
                { text: "无安全感：感到担心且无自信心", value: "S" },
                { text: "优柔寡断：很难下决定", value: "C" },
                { text: "好插嘴：一个滔滔不绝的发言人，不是好听众，不注意别人的说话", value: "I" }
            ]
        },
        {
            question: "26. 您更符合哪一项？",
            answers: [
                { text: "不受欢迎：由于强烈要求完美，而拒人千里", value: "C" },
                { text: "不参与：不愿意加入，不参与，对别人生活不感兴趣", value: "S" },
                { text: "难预测：时而兴奋，时而低落，或总是不兑现诺言", value: "I" },
                { text: "缺同情心：很难当众表达对弱者或者受难者的情感", value: "D" }
            ]
        },
        {
            question: "27. 您更符合哪一项？",
            answers: [
                { text: "固执：坚持照自己的意见行事，不听不同意见", value: "D" },
                { text: "随兴：做事情没有一贯性，随意做事情", value: "I" },
                { text: "难于取悦：因为要求太高而使别人很难取悦", value: "C" },
                { text: "行动迟缓：迟迟才行动，不易参与或者行动总是慢半拍", value: "S" }
            ]
        },
        {
            question: "28. 您更符合哪一项？",
            answers: [
                { text: "平淡：平实淡漠，中间路线,无高低之分，很少表露情感", value: "S" },
                { text: "悲观：尽管期待最好但往往首先看到事物不利之处", value: "C" },
                { text: "自负：自我评价高，认为自己是最好的人选", value: "D" },
                { text: "放任:许别人做他喜欢做的事情，为的是讨好别人，令别人鼓吹自己", value: "I" }
            ]
        },
        {
            question: "29. 您更符合哪一项？",
            answers: [
                { text: "易怒：善变，孩子性格，易激动，过后马上就忘了", value: "I" },
                { text: "无目标：不喜欢目标，也无意订目标", value: "S" },
                { text: "好争论：易与人争吵，不管对何事都觉得自己是对的", value: "D" },
                { text: "孤芳自赏：容易感到被疏离，经常没有安全感或担心别人不喜欢和自己相处", value: "C" }
            ]
        },
        {
            question: "30. 您更符合哪一项？",
            answers: [
                { text: "天真：孩子般的单纯，不理解生命的真谛", value: "I" },
                { text: "消极：往往看到事物的消极面阴暗面，而少有积极的态度", value: "C" },
                { text: "鲁莽：充满自信有胆识但总是不恰当", value: "D" },
                { text: "冷漠：漠不关心，得过且过", value: "S" }
            ]
        },
        {
            question: "31. 您更符合哪一项？",
            answers: [
                { text: "担忧：时时感到不确定、焦虑、心烦", value: "S" },
                { text: "不善交际:总喜欢挑人毛病，不被人喜欢", value: "C" },
                { text: "工作狂:为了回报或者说成就感，而不是为了完美，因而设立雄伟目标不断工作，耻于休息", value: "D" },
                { text: "喜获认同：需要旁人认同赞赏，像演员", value: "I" }
            ]
        },
        {
            question: "32. 您更符合哪一项？",
            answers: [
                { text: "过分敏感：对事物过分反应，被人误解时感到被冒犯", value: "C" },
                { text: "不圆滑老练：经常用冒犯或考虑不周的方式表达自己", value: "D" },
                { text: "胆怯：遇到困难退缩", value: "S" },
                { text: "喋喋不休：难以自控，滔滔不绝，不能倾听别人", value: "I" }
            ]
        },
        {
            question: "33. 您更符合哪一项？",
            answers: [
                { text: "腼腆：事事不确定，对所做的事情缺乏信心", value: "S" },
                { text: "生活紊乱：缺乏安排生活的能力", value: "I" },
                { text: "跋扈：冲动的控制事物和别人，指挥他人", value: "D" },
                { text: "抑郁：常常情绪低落", value: "C" }
            ]
        },
        {
            question: "34. 您更符合哪一项？",
            answers: [
                { text: "缺乏毅力：反复无常，互相矛盾，情绪与行动不合逻辑", value: "I" },
                { text: "内向：活在自己的世界里，思想和兴趣放在心里", value: "C" },
                { text: "不容忍：不能忍受他人的观点、态度和做事的方式", value: "D" },
                { text: "无异议：对很多事情漠不关心", value: "S" }
            ]
        },
        {
            question: "35. 您更符合哪一项？",
            answers: [
                { text: "杂乱无章：生活环境无秩序，经常找不到东西", value: "I" },
                { text: "情绪化：情绪不易高涨，感到不被欣赏时很容易低落", value: "C" },
                { text: "喃喃自语：低声说话，不在乎说不清楚", value: "S" },
                { text: "喜操纵：精明处事，操纵事情，使对自己有利", value: "D" }
            ]
        },
        {
            question: "36. 您更符合哪一项？",
            answers: [
                { text: "缓慢：行动思想均比较慢，过分麻烦", value: "S" },
                { text: "顽固：决心依自己的意愿行事，不易被说服", value: "D" },
                { text: "好表现：要吸引人，需要自己成为被人注意的中心", value: "I" },
                { text: "有戒心：不易相信，对语言背后的真正的动机存在疑问", value: "C" }
            ]
        },
        {
            question: "37. 您更符合哪一项？",
            answers: [
                { text: "孤僻：需要大量的时间独处，避开人群", value: "C" },
                { text: "统治欲：毫不犹豫地表示自己的正确或控制能力", value: "D" },
                { text: "懒惰：总是先估量事情要耗费多少精力，能不做最好", value: "S" },
                { text: "大嗓门：说话声和笑声总盖过他人", value: "I" }
            ]
        },
        {
            question: "38. 您更符合哪一项？",
            answers: [
                { text: "拖延：凡事起步慢，需要推动力", value: "S" },
                { text: "多疑：凡事怀疑，不相信别人", value: "C" },
                { text: "易怒：对行动不快或不能完成指定工作时易烦躁和发怒", value: "D" },
                { text: "不专注：无法专心致志或者集中精力", value: "I" }
            ]
        },
        {
            question: "39. 您更符合哪一项？",
            answers: [
                { text: "报复性：记恨并惩罚冒犯自己的人", value: "C" },
                { text: "烦躁：喜新厌旧，不喜欢长时间做相同的事情", value: "I" },
                { text: "勉强：不愿意参与或者说投入", value: "S" },
                { text: "轻率：因没有耐心，不经思考，草率行动", value: "D" }
            ]
        },
        {
            question: "40. 您更符合哪一项？",
            answers: [
                { text: "妥协：为避免矛盾即使自己是对的也不惜放弃自己的立场", value: "S" },
                { text: "好批评：不断地衡量和下判断，经常考虑提出反对意见", value: "C" },
                { text: "狡猾：精明，总是有办法达到目的", value: "D" },
                { text: "善变：像孩子般注意力短暂，需要各种变化，怕无聊", value: "I" }
            ]
        }
    ];
    window.submitName = function() {
        userName = document.getElementById('user-name').value;
        if (userName.trim() !== '') {
            nameContainer.style.display = 'none';
            questionsContainer.style.display = 'block';
            loadQuestion(currentQuestionIndex);
        } else {
            alert('请输入您的姓名');
        }
    };

    function loadQuestion(index) {
        questionTitle.innerText = questions[index].question;
        answersContainer.innerHTML = '';

        questions[index].answers.forEach(answer => {
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            answerElement.innerText = answer.text;
            answerElement.addEventListener('click', () => selectAnswer(answerElement, answer.value));
            answersContainer.appendChild(answerElement);
        });
    }

    function selectAnswer(element, value) {
        const answers = document.querySelectorAll('.answer');
        answers.forEach(answer => answer.classList.remove('highlight'));
        element.classList.add('highlight');
        score[value]++;
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                showResults();
            }
        }, 500);
    }

    function showResults() {
        questionsContainer.innerHTML = '<h2>测试完成，谢谢参与！</h2>';
        const result = `姓名: ${userName}  \nD: ${score.D}, I: ${score.I}, S: ${score.S}, C: ${score.C}`;
        questionsContainer.innerHTML += `<p>${result}</p>`;
        sendResultToWeChat(userName, score);
    }

    function sendResultToWeChat(name, score) {
        const data = {
            name: name,
            score: score
        };
        fetch('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=2727181b-9456-494f-98db-9eb1391da96d', {
            method: 'POST',
            mode: 'no-cors', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                msgtype: 'text',
                text: {
                    content: `姓名: ${data.name}\nD: ${data.score.D}, I: ${data.score.I}, S: ${data.score.S}, C: ${data.score.C}`
                }
            })
        })
        .then(response => response.json())
        .then(data => console.log('成功:', data))
        .catch(error => console.error('错误:', error));
    }
});
