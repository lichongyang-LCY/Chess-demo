require("../../base/Core");
require("../uiBase/CUIBaseController");

Class({
    ClassName:"Game.UI.CUIController.CUIZJHGameOverController",
    Base:"Game.UI.CUIBaseController",
    m_UIOnePersons:null,
    AccpectUI:true,
    onLoad:function()
    {
        this.m_UIOnePersons = {};
        for(var i=1;i<4;i++)
        {
            var temp = this.node.getChildByName("Person{0}".Format(i));
            var onePerson = Game.UI.CUIController.CUIZJHOnePersonOverController.Create();
            temp.addChild(onePerson);
            this.m_UIOnePersons[i] = onePerson.Controller;
        }
    },
    Reset:function()
    {
        for(var i=1;i<4;i++)
        {
            this.m_UIOnePersons[i].node.active = false;
        }
    },
    Hide:function()
    {

        this.node.active = false;
    },
    Show:function(persons,winner)
    {
        this.Reset();

        var i=1;
        for(var key in persons)
        {
            this.m_UIOnePersons[i++].Show(key,winner,persons[key]);
        }
        this.node.active = true;
    }
})