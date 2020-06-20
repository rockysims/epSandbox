jQuery(document).ready(function(){        
    handleSocialLinks();
    team_iso_porfolio = new TeamIsotopePortfolio();
    team_iso_porfolio.init();    
});
function handleSocialLinks(){        
    jQuery('.rx_team_social img').each(function(indx){                        
        jQuery(this).css('opacity', .7);
        jQuery(this).hover(function(e){
            TweenMax.to(jQuery(this), .2, {opacity: 1, ease:Elastic.EaseIn});
        }, function(e){
            TweenMax.to(jQuery(this), .2, {opacity: .7, ease:Elastic.EaseIn});
        });
    });
}



function TeamIsotopePortfolio(){
    this.init=function(){                
        initIsotopeMenu();   
    }
    var isotopeMenu;
    function initIsotopeMenu(){
        jQuery('.our_team_isotopeItem').each(function(indx){
            jQuery(this).css('margin', STREAM_TEAM_DTA.GAP+'px');
        });
        
        isotopeMenu = new Array();     
        jQuery('.our_team_isotopeMenu li').each(function(index){
            var link = jQuery(this).find('a');
            isotopeMenu.push({categoryID: link.attr('href'), link: link, iconClass: link.attr('class')});            
            link.click(function(e){
                e.preventDefault();
                selectMenuItem(index);              
            });
        });
        selectMenuItem(0);
    }
    //select isotope menu
    function selectMenuItem(indx){
        for(var i=0;i<isotopeMenu.length;i++){
            if(i==indx){                 
                isotopeMenu[i].link.css('background-color', '#'+STREAM_TEAM_DTA.MENU_BACKGROUND_COL);                               
                filterIsotopeItems(indx);
            }else{                                
                isotopeMenu[i].link.css('background', 'none');
            }
        }
    }
    
    function filterIsotopeItems(index){
     var selector = "."+isotopeMenu[index].categoryID;
     (selector==".*")?selector="*":null;
     jQuery('.our_teamisotopeContainer').isotope({
           filter: selector,
           animationOptions: {
               duration: 750,
               easing: 'linear',
               queue: false,
          }});       
    }
}
