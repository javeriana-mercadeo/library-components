<#if buttonAccordeon.acordeonHelp.getSiblings()?has_content>
	<#list buttonAccordeon.acordeonHelp.getSiblings() as cur_buttonAccordeon_acordeonHelp>
		<#if (cur_buttonAccordeon_acordeonHelp.getData())??>
			${cur_buttonAccordeon_acordeonHelp.getData()}
		</#if>
	</#list>
</#if>