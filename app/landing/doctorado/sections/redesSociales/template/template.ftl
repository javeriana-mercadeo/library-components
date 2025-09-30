<ul class="socialMedia_social-list">
  <#if grad_socialGroup.getSiblings()?has_content>
    <#list grad_socialGroup.getSiblings() as cur_grad_socialGroup>
      <li class="socialMedia_item">
            <a
              href="<#if (cur_grad_socialGroup.grad_socialUrl.getData())??>
	                    ${cur_grad_socialGroup.grad_socialUrl.getData()}
                    </#if>"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="<#if (cur_grad_socialGroup.grad_socialAria.getData())??>
	                          ${cur_grad_socialGroup.grad_socialAria.getData()}
                          </#if>"
              class="socialMedia_link"
              data-social-link="true"
              data-social-url="<#if (cur_grad_socialGroup.grad_socialUrl.getData())??>
	                              ${cur_grad_socialGroup.grad_socialUrl.getData()}
                              </#if>">
              <i class="ph-fill ph-link" data-social-icon="true"></i>
            </a>
          </li>
    </#list>
  </#if>  
</ul>